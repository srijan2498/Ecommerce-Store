import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";
import path from 'path'

const app = express();

dotenv.config();

const corsOptions = {
  origin: "https://srijan-appoint.vercel.app", // Specify the allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Include credentials like cookies
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(PORT, console.log(`Server running on port ${PORT}`.bgCyan));
