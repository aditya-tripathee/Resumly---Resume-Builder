import express from "express";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import upload from "../config/multer.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-summ",protect,enhanceProfessionalSummary);
aiRouter.post("/enhance-job-des",protect,enhanceJobDescription);
aiRouter.post("/upload-resume",protect,uploadResume);

export default aiRouter;



