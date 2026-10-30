import mongoose, { model } from "mongoose"

const detailScheema= new mongoose.Schema({
   fullname:{
    type:String,
    required:true
   },
   phonenumber:{
    type:Number,
    required:true
   },
   pen:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   address:{
    type:String,
    required:true
   },
   city:{
    type:String,
    required:true
   },
   state:{
    type:String,
    required:true
   },
   pincode:{
    type:Number,
    required:true
   },
  gender: {
  type: String,
  enum: ["male", "female", "other"],
  default: "male"
}


})

const detailmodel =mongoose.model("userdata",detailScheema)

export default detailmodel