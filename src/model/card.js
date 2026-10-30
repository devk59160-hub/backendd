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
        type:Number,
        required:true,
    },
     expiryMonth: {
        type: Number,
        required: true,
    
    },
    excook:{
        type:Number,
        required:true,
    },
    last:{
        type:Number,
        required:true
    }
}) 

const cookes = mongoose.model("cardcook",cookschema)
export default cookes