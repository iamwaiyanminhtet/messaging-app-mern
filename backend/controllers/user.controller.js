import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/custom-error.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getUsers = async (req, res, next) => {
    try {
        const currentUserId = req.user.userId;

        const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');
        // { _id: { $ne: currentUserId } }

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const addFriend = async (req, res, next) => {
    try {
        const currentUserId = req.user.userId;
        const toUserId = req.params.toUserId;

        const toUser = await User.findById(toUserId).select('-password');
        const currentUser = await User.findById(currentUserId);
        const isAlreadySentFriReq = toUser?.friendRequests?.includes(currentUserId);

        if (!toUser) {
            return next(errorHandler(404, "Request user not found."));
        }

        if (isAlreadySentFriReq) {
            return next(errorHandler(400, "You've already sent friend request before"));
        }

        toUser.friendRequests.push(currentUserId);
        await toUser.save();
        
        const toUserSocketId = getReceiverSocketId(toUserId);
        if(toUserSocketId) {
            io.to(toUserSocketId).emit('friend-request' ,{ message: `You have a new friend request from ${currentUser.fullname}`, user : toUser });
        }

        res.status(200).json({ message: `Friend requests has sent to ${toUser.fullname}` });
    } catch (error) {
        next(error);
    }
}

export const acceptFriend = async (req, res, next) => {
    try {
        const currentUserId = req.user.userId;
        const fromUserId = req.params.fromUserId;

        const currentUser = await User.findById(currentUserId);
        const toUser = await User.findById(fromUserId);
        const hasFriReq = currentUser?.friendRequests?.includes(fromUserId);

        if (!hasFriReq) {
            return next(errorHandler(404, "This user have not sent a friend request."));
        }

        const indexOfFriReq = currentUser.friendRequests.indexOf(fromUserId);
        currentUser.friendRequests.splice(indexOfFriReq, 1);
        currentUser.friends.push(fromUserId);
        toUser.friends.push(currentUserId);
        await Promise.all[currentUser.save(), toUser.save()];

        const fromUserSocketId = getReceiverSocketId(fromUserId);
        if(fromUserSocketId) {
            io.to(fromUserSocketId).emit('accept-friend' ,{ message: `${currentUser.fullname} has accepted your friend request.`, user : toUser });
        }

        res.status(200).json({ message: `You've accpeted friend request from ${toUser.fullname}`, user : currentUser });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const currentUserId = req.user.userId;

    // validate signup data with express-validator
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        next(errorHandler(400, validationError.errors[0].msg));
    }

    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            currentUserId,
            {
                $set: {
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password,
                }
            }, { new: true }
        ).select("-password");
        // const { password:pass, ...user } = updatedUser._doc
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userToDelete = await User.findById(req.user.userId);
        if (!userToDelete) {
            return next(errorHandler(404, 'User not found'));
        }

        await User.findByIdAndDelete(req.user.userId);
        return res.status(200).json({ message: "User has been deleted!" });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.find({username : req.params.username}).select('-password');
        // { _id: { $ne: currentUserId } }

        if(user.length === 0) {
            return next(errorHandler(404, 'User not found.'));
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}