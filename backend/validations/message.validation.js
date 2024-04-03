import { body } from "express-validator";

export const messageValidation = [
    body('message').trim().isString().escape().withMessage("Message : Invalid Value"),
]