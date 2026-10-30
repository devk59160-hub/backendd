import dotenv from "dotenv"
import app from "./src/index.js"
import DataConnection from "./src/dataconnection/mongoose.js"
dotenv.config()
await DataConnection()



const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
  console.log(`server run port ${PORT}`,)
})