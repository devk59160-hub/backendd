
import app from "./src/index.js"
import DataConnection from "./src/dataconnection/mongoose.js"

await DataConnection()



const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
  console.log(`server run port ${PORT}`,)
})