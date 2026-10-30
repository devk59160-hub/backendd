import mongoose from "mongoose"

const achschema = new mongoose.Schema({
    userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "userdata",
            required: true
    },
    name:{
        type:String,
        required:true
    },
    numberofac:{
        type:String,
        required:true
    },

    numberif:{
        type:String,
        required:true
    }

})

const scif= mongoose.model("holder",achschema)
export default scif