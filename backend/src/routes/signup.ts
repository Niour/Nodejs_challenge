import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import { EntityAlreadyExistError } from "../errors/customErrors";
import User from "../models/user";

export const signupRouter = express.Router();

signupRouter.post(
  "/signup",
  catchErrors(async function (req, res, _next) {
    const { username, email, password } = req?.body;

    const exists = await User.findOne({ where: { username } });
    if (!exists) {
      const data = await User.create({ username, email, password });
      res.json(data);
    } else {
      throw new EntityAlreadyExistError("User");
    }
  })
);
