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
    .trim()
    .notEmpty()
    .withMessage("Card number is required")
    .matches(/^(?:\d{4} ?){3}\d{4}(?: ?\d{3})?$/)
    .withMessage("Invalid card number format"),

  // Expiry Date
  body("expiryMonth")
    .trim()
    .notEmpty()
    .withMessage("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .withMessage("Invalid expiry date format"),
   
    body("last")
        .notEmpty()
        .withMessage("this number must be required")
        .isLength({ min: 3, max: 4 })
        .withMessage("Invalide detail")
        .matches(/^[0-9]/),

    validationResponse
];

export default validateCard;