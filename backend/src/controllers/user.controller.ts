import { Request, Response } from "express";
import {
  createUserService,
  deleteUserByIdService,
  forgotPasswordService,
  loginUserService,
  myProfileService,
  readAllUserService,
  readUserByIdService,
  resetPasswordService,
  updateMyProfileService,
  updatePasswordService,
} from "../services/user.services";
import { sendErrorMessage, sendSuccessMessage } from "../utils/responseHelper";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await createUserService(name, email, password, address, phone);
    console.log(req.body.guardianContact);
    sendSuccessMessage(res, "User created successfully.", 201, {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      dob: user?.phone,
      address: user?.address,
      role: user?.role,
    });
  } catch (err: any) {
    if (err.message === "USER EXISTS") {
      sendErrorMessage(res, "User already exists", 409);
    }
    sendErrorMessage(res, "User creation failed", 400);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await loginUserService(req.body.email, req.body.password);
    sendSuccessMessage(res, "User Login successfull", 200, user as any);
  } catch (err: any) {
    if (err.message === "INVALID_EMAIL" || err.message === "INVALID PASSWORD") {
      sendErrorMessage(res, "INVALID_EMAIL and INVALID PASSWORD", 401);
    }
    sendErrorMessage(res, "User login failed", 500);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await forgotPasswordService(req.body.email);
    sendSuccessMessage(
      res,
      `Reset Password link send to ${req.body.email}`,
      200,
      null,
    );
  } catch (err: any) {
    if (err.message === "Invalid_EMAIL") {
      sendErrorMessage(res, "Email not registered", 400);
    }
    sendErrorMessage(res, "User Not found", 400);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let token: any;
    token = req.headers.authorization?.split(" ")[1];

    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const user = await resetPasswordService(
      newPassword,
      confirmPassword,
      token,
    );
    sendSuccessMessage(res, "Password reset was successful", 200, user as any);
  } catch (err: any) {
    if (err.message === "INVALID NEW_PASSWORD & CONFIRM_PASSWORD") {
      sendErrorMessage(
        res,
        "NewPassword and ConfirmPassowrd Didnot match",
        400,
      );
    }
    if (err.message === "INVALID_TOKEN") {
      sendErrorMessage(res, "Token expired", 400);
    }
    if (err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "User not found", 400);
    }
    sendErrorMessage(res, "Error reseting password .Try again later", 400);
  }
};

export const readAllUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = await readAllUserService();
  sendSuccessMessage(res, "User fetched successfully", 200, user as any);
};

export const readUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let userId = req.params.id as string;
    const user = await readUserByIdService(userId);
    sendSuccessMessage(res, "Profile fetched successfully", 200, user as any);
  } catch (err: any) {
    if (err.message === "ID_NOT_FOUND" || err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "Error fetching profile", 400);
    }
  }
};

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    let userId = (req as any).id;
    const user = await myProfileService(userId);
    sendSuccessMessage(res, "Profile fetched successfully", 200, user as any);
  } catch (err: any) {
    if (err.message === "ID_NOT_FOUND" || err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "Error fetching profile", 400);
    }
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let userId = (req as any).id;
    let data = req.body;

    const user = await updateMyProfileService(userId, data);
    sendSuccessMessage(res, "Profile updated successfully", 200, user as any);
  } catch (err: any) {
    if (
      err.message === "ID_NOT_FOUND" ||
      err.message === "PROFILE_UPDATE_FAILED"
    ) {
      sendErrorMessage(res, "Error updating profile", 400);
    }
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    let userId = (req as any).id;
    let { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await updatePasswordService(
      userId,
      oldPassword,
      newPassword,
      confirmPassword,
    );

    return sendSuccessMessage(res, "Password updated successfully", 200, null);
  } catch (err: any) {
    if (err.message === "OLD_PASSWORD_DIDNOT_MATCH") {
      return sendErrorMessage(res, "Old password didnot match", 400);
    }
    if (err.message === "NEW_PASSWORD AND CONFIRM_PASSWORFD DIDNOT MATCH") {
      return sendErrorMessage(
        res,
        "New password and confirm password didnot match",
        400,
      );
    }
    if (err.message === "ID_NOT_FOUND") {
      return sendErrorMessage(res, "Id not found", 400);
    }
    if (err.message === "USER_NOT_FOUND") {
      return sendErrorMessage(res, "User not found", 400);
    }
    return sendErrorMessage(res, "Error occured while updating password", 400);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let userId = req.params.id as string;
    const user = await deleteUserByIdService(userId);
    sendSuccessMessage(
      res,
      "Use rDelated fetched successfully",
      200,
      user as any,
    );
  } catch (err: any) {
    if (err.message === "ID_NOT_FOUND" || err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "Error Delating profile", 400);
    }
  }
};
