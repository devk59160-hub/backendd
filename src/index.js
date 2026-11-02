import dotenv from "dotenv";
import express from "express";
import router from "./router/detail.router.js";
import cookies from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://creaditsea.vercel.app",
  "https://deshtop.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

app.use("/api/auth", router);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running"
  });
});

export default app;