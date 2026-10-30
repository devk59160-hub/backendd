import mongoose from "mongoose"

async function DataConnection(){
   await  mongoose.connect(process.env.MONGO_DB)
    console.log("mongoodb connection successfull")
}

export default DataConnection