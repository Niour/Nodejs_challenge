import { Request } from "express";

import { verifyToken } from "../utils/authToken";
import { catchErrors } from "../errors/asyncCatch";
import { InvalidTokenError } from "../errors/customErrors";
import User from "../models/user";

export const authenticateUser = catchErrors(async (req, res, next) => {
  const token = getAuthTokenFromRequest(req);
  if (!token) {
    throw new InvalidTokenError("Authentication token not found.");
  }
  const userId = verifyToken(token).uid;

  if (!userId) {
    throw new InvalidTokenError("Authentication token is invalid.");
  }
  const user = await User.findOne(userId);
  if (!user) {
    throw new InvalidTokenError(
      "Authentication token is invalid: User not found."
    );
  }
  res.locals.currentUser = user;
  next();
});

const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get("Authorization") || "";
  const [bearer, token] = header.split(" ");
  return bearer === "Bearer" && token ? token : null;
};
