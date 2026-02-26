import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  myProfile,
  readAllUser,
  registerUser,
  resetPassword,
  updateMyProfile,
  updatePassword,
} from "../controllers/user.controller";
import isAuthenticated from "../middleware/isAuthenticated.middleware";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").patch(resetPassword);
userRouter.route("/all-user").get(readAllUser);

// userRouter.route("/:id").get(myProfileService);

userRouter.route("/my-profile").get(isAuthenticated, myProfile);
userRouter.route("/update-profile").patch(isAuthenticated, updateMyProfile);
userRouter.route("/update-password").patch(isAuthenticated, updatePassword);

export default userRouter;
