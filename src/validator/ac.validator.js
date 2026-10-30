import { body, validationResult } from "express-validator";

const validationResponse = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

const validateAccount = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Account holder name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("numberofac")
        .isLength({min:16,max:16})
        .withMessage("Invalid account type"),

    body("numberif")
        .trim()
        .notEmpty()
        .withMessage("IFSC code is required")
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
        .withMessage("Invalid IFSC code"),

    validationResponse

];

export default validateAccount;