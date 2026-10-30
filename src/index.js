import express from "express"
import router from "./router/detail.router.js"
import cookies from "cookie-parser"



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookies())

app.use("/api/auth",router)

export default app