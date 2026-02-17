import express from "express";
import { createResume, deleteResume, getPublicResumeId, getResumeById, updateResume } from "../controllers/resumeController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import upload from "../config/multer.js";


const resumeRouter = express.Router();

resumeRouter.post("/create",protect,createResume);
resumeRouter.put("/update", protect, upload.single("image"), updateResume);
resumeRouter.delete("/delete/:resumeId",protect,deleteResume);
resumeRouter.get("/public/:resumeId",getPublicResumeId);
resumeRouter.get("/get/:resumeId",protect,getResumeById);


export default resumeRouter;

