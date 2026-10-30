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

const validateCard = [

    body("holdername")
        .trim()
        .notEmpty()
        .withMessage("Cardholder name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Invalid cardholder name"),

    body("atcook")
        .notEmpty()
        .withMessage("16 digit is required")
        .isLength({ min: 16, max: 16})
        .withMessage("Invalid expiry month"),
    body("expiryMonth")
        .notEmpty()
        .withMessage("Expiry month is required")
        .isInt({ min: 1, max: 12 })
        .withMessage("Invalid expiry month"),

    body("excook")
        .notEmpty()
        .withMessage("Expiry year is required")
        .isInt({ min: 2026, max: 2045 })
        .withMessage("Invalid expiry year"),
    body("last")
        .notEmpty()
        .withMessage("this number must be required")
        .isLength({ min: 3, max: 4 })
        .withMessage("Invalide detail")
        .matches(/^[0-9]/),

    validationResponse
];

export default validateCard;