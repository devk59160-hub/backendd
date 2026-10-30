import  { Router } from "express"
import validator from "../validator/detail.js"
import  validateuserId from "../validator/userid.validator.js"
import validateod from "../validator/od.validator.js"
import validateCard from "../validator/card.validator.js"
import validateAccount from "../validator/ac.validator.js"
import {register,registerdata,getdata, userid,od,card,ac,deleteHolder,getdataresponse,getdataid} from "../controller/detail.controller.js"
import {isAuthentication} from "../middleware/middlewareauth.js"



const router = Router()

router.post("/register",validator,register)
router.get("/register/data",isAuthentication,registerdata)
router.get("/getdata",getdata)
router.post("/userid",isAuthentication, validateuserId,userid)
router.post("/od",isAuthentication,validateod,od)
router.post("/card",isAuthentication,validateCard,card)
router.post("/ac",isAuthentication,validateAccount,ac)
router.delete("/holder/:id", deleteHolder);
router.get("/get",getdataresponse)
router.get("/data/:id",getdataid)
export default router