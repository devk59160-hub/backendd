import dotenv from "dotenv"
import app from "./src/index.js"
import DataConnection from "./src/dataconnection/mongoose.js"
dotenv.config()
DataConnection()

app.listen(3000,(req,res)=>{
  console.log("server run port ",3000)
})