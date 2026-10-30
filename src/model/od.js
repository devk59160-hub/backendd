import mongoose from "mongoose"
// import { userid } from "../controller/detail.controller"

const oditschema = new mongoose.Schema({
    userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "userdata",
            required: true
    },
    od:{
        type:Number,
        required:true
    }
}) 

const oditsche = mongoose.model("odit",oditschema)
export default oditsche