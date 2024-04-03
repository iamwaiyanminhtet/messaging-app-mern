import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/custom-error.js";
import User from "../models/user.model.js";
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js";

export const signup = async (req, res, next) => {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender || fullname === '' || username === '' || password === '' || confirmPassword === '' || gender === '') {
        return next(errorHandler(400, "All fields are required!"));
    }

    // validate signup data with express-validator
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return next(errorHandler(400, validationError.errors[0].msg));
    }

    try {
        const hashPassword = bcryptjs.hashSync(password, 10);
        const pfpBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const pfpGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = await User.create({
            fullname,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? pfpBoy : pfpGirl
        });

        res.status(201).json({
            _id : user._id,
            fullname : user.fullname,
            username : user.username,
            gender : user.gender,
            profilePic : user.profilePic,
        });

    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username === '' || password === '') {
        return next(errorHandler(400, "All fields are required!"));
    }

    // validate signup data with express-validator
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        return next(errorHandler(400, validationError.errors[0].msg));
    }

    try {
        const user = await User.findOne({ username });

        if(!user) {
            return next(errorHandler(404, "User not found."))
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!user || !validPassword) {
            return next(errorHandler(400, 'Invalid username or password'));
        }

        generateTokenAndCookie(user._id, res);

        res.status(200).json({
            _id : user._id,
            fullname : user.fullname,
            username : user.username,
            gender : user.gender,
            profilePic : user.profilePic,
        });
    } catch (error) {
        next(error)
    }
}

export const signout = async (req, res, next) => {
    try {
        res.status(200).clearCookie('messaging_access_token').json({message : "Signed out successfully"})
    } catch (error) {
        next(error)
    }
}