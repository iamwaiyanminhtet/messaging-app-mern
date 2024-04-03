import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";
import { signInValidation, signUpValidation } from "../validations/user.validation.js";

const router = express.Router();

router.post('/signup', signUpValidation, signup);
router.post('/signin', signInValidation, signin);
router.post('/signout', signout);

export default router;
