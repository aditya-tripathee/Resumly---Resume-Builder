import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRouter.js";
import imageKit from "./config/imageKit.js";
import aiRouter from "./routes/aiRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;


// Database connection 
await dbConnect();

// middlewares
app.use(express.json());
app.use(cors());


// Routes 
app.use("/api/users",userRouter);
app.use("/api/resumes",resumeRouter);
app.use("/api/ai",aiRouter);




// Server listen
app.listen(PORT,()=>{
    console.log(`Server is running aon PORT ${PORT}`)
});

