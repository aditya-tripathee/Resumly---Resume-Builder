import express from "express";
import { getUserById, registerUser, userLogin } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddlewares.js";
import { getUserResume } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",userLogin);
userRouter.get("/data",protect,getUserById);
userRouter.get("/resumes",protect,getUserResume);


export default userRouter;