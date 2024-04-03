import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { messageValidation } from "../validations/message.validation.js";
import { deleteConversation, deleteMessage, getMessages, sendMessage, updateMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post('/send/:receiverId', messageValidation, verifyUser, sendMessage);
router.put('/:messageId', messageValidation, verifyUser, updateMessage);
router.delete('/:messageId', verifyUser, deleteMessage);

router.get('/:userToChatId', verifyUser, getMessages);
router.delete('/convo/:conversationId', verifyUser, deleteConversation)

export default router;