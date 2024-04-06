import { validationResult } from "express-validator";

import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { errorHandler } from "../utils/custom-error.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user.userId;

        // validate signup data with express-validator
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return next(errorHandler(400, validationError.errors[0].msg));
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = new Message({
            senderId, receiverId, message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { userToChatId } = req.params;
        const senderId = req.user.userId;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate('messages');

        if(!conversation) return res.status(200).json([]);
        res.status(200).json(conversation);

    } catch (error) {
        next(error);
    }
}

export const updateMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { userId } = req.user;

        // validate signup data with express-validator
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return next(errorHandler(400, validationError.errors[0].msg));
        }

        const messageToUpdate = await Message.findById(req.params.messageId);
        if(userId != messageToUpdate.senderId) {
            return next(errorHandler(401, "You are not allowed to update this message"));
        }

        messageToUpdate.message = message;
        await messageToUpdate.save();

        res.status(200).json(messageToUpdate);
    } catch (error) {
        next(error)
    }
}

export const deleteMessage = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        const { userId } = req.user;

        const messageToDelete = await Message.findById(messageId);
        if(userId != messageToDelete.senderId) {
            return next(errorHandler(401, "You are not allowed to delete this message"));
        }

        const message = await Message.findByIdAndDelete(messageId);
        res.status(200).json(message);
    } catch (error) {
        next(error)
    }
}

export const deleteConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const conversation = await Conversation.findById(conversationId);

        if(!conversation) {
            return next(errorHandler(404, "Conversation not found"));
        }

        await Conversation.findByIdAndDelete(conversationId);

        conversation.messages.forEach(async (msgId) => {
            await Message.findByIdAndDelete(msgId);
        })

        res.status(200).json({message : "Conversation has been deleted"})

    } catch (error) {
        next(error);
    }
}