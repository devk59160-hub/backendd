import {body,validationResult} from "express-validator"

async function validationResponse(req,res,next){
   const errors = validationResult(req)


   if(!errors.isEmpty()){
    return res.status(400).json({
        success:false,
        errors:errors.array(),
    })
   }

next()

}


 const validateod = [
  body("od")
    .trim()
    .notEmpty().withMessage("Full userid is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("ony 6 charactor")
    //  .matches(/^[0-9]{6}$/)
    .withMessage("Full name contains invalid characters"),

  validationResponse,
];

export default validateod
