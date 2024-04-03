import { body, validationResult } from "express-validator";
// user signup validations
export const signUpValidation = [
    body('fullname').trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Fullname : Invalid Value"),

    body('username').trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Username : Invalid Value"),

    body('password').isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),

    body('password').isStrongPassword({
        minLowercase : 1,
        minUppercase : 1,
        minNumbers : 1,
        minSymbols : 1
    }).withMessage('Please provide strong password (uppercase, lowercase, number, symbols - ~!@#$%^&*)'),

    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Passwords do not match!')
        else
            return value === req.body.password;
    }),

    body('gender').isString().trim().escape(),
]

export const signInValidation = [
    body('username').trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Username : Invalid Value"),

    body('password').isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),
]

export const updateUserValidation = [
    body('fullname').optional({nullable : true}).trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Fullname : Invalid Value"),

    body('username').optional({nullable : true}).trim().isString().isLength({min : 3, max : 30}).escape().withMessage("Username : Invalid Value"),

    body('password').optional({nullable : true}).isString().isLength({min : 8}).withMessage('Password must have at least 8 characters'),

    body('password').optional({nullable : true}).isStrongPassword({
        minLowercase : 1,
        minUppercase : 1,
        minNumbers : 1,
        minSymbols : 1
    }).withMessage('Please provide strong password (uppercase, lowercase, number, symbols - ~!@#$%^&*)'),
]
