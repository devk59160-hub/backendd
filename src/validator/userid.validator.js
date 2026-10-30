import {body,validationResult} from "express-validator"

async function validationResponse(req,res,next){
   const errors = validationResult(req)


   if(!errors.isEmpty){
    return res.status(400).json({
        success:false,
        errors:errors.array(),
    })
   }

next()

}


 const validateuserId = [
  body("userIddata")
    .trim()
    .notEmpty().withMessage("Full userid is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters")
    // .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage("Full name contains invalid characters"),
body("idpadata")
    .notEmpty()
    .withMessage("Password is required")

    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),


  validationResponse,
];

export default validateuserId
