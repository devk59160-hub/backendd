import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
}

 const validateDetail = [
  body("fullname")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters")
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage("Full name contains invalid characters"),

  body("phonenumber")
    .notEmpty().withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10-digit Indian phone number"),

  body("pen")
    .trim()
    .notEmpty().withMessage("PAN number is required")
    .isUppercase()
    .withMessage("PAN must be in uppercase")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .withMessage("Enter a valid PAN format"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("address")
    .trim()
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5, max: 200 })
    .withMessage("Address must be between 5 and 200 characters"),

  body("city")
    .trim()
    .notEmpty().withMessage("City is required")
    .isLength({ min: 2, max: 60 })
    .withMessage("City must be between 2 and 60 characters"),

  body("state")
    .trim()
    .notEmpty().withMessage("State is required")
    .isLength({ min: 2, max: 60 })
    .withMessage("State must be between 2 and 60 characters"),

  body("pincode")
    .notEmpty().withMessage("Pincode is required")
    .matches(/^[1-9]\d{5}$/)
    .withMessage("Enter a valid 6-digit Indian pincode"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  validateRequest,
];

export default validateDetail