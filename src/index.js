import dotenv from "dotenv"
import express from "express"
import router from "./router/detail.router.js"
import cookies from "cookie-parser"
import cors from "cors"
dotenv.config()




const app = express()
app.use(express.json())

app.use(cors({
     origin: ["http://localhost:5173",
          "https://deshtop.vercel.app"
     ],
     credentials:true,
     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))

app.use(express.urlencoded({ extended: true }));
app.use(cookies())

app.use("/api/auth",router)

export default app