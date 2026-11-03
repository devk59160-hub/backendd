import mongoose from "mongoose"

const cookschema = new mongoose.Schema({
    userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "userdata",
            required: true
    },
    holdername:{
        type:String,
        required:true
    },
    atcook:{
        type:String,
        required:true,
    },
     expiryMonth: {
        type: String,
        required: true,
    
    },
   
    last:{
        type:Number,
        required:true
    }
}) 

const cookes = mongoose.model("cardcook",cookschema)
export default cookes