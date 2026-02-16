import express from "express";
import { getUserById, registerUser, userLogin } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.get("/login",userLogin);
userRouter.get("/data",protect,getUserById);

export default userRouter;
