import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { acceptFriend, addFriend, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { updateUserValidation } from "../validations/user.validation.js";

const router = express.Router();

router.get('/users', verifyUser, getUsers);
router.put('/', verifyUser, updateUserValidation, updateUser);
router.delete('/', verifyUser, deleteUser);

router.post('/add-friend/:toUserId', verifyUser, addFriend);
router.post('/accept-friend/:fromUserId', verifyUser, acceptFriend);

export default router;