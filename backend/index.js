import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
dotenv.config();
import userRouter from "./routes/userRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Database connection 
await dbConnect();


app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Server is live")
});

// Routes 
app.use("/api/users",userRouter);


// Server listen
app.listen(PORT,()=>{
    console.log(`Server is running aon PORT ${PORT}`)
});

