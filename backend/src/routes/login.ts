import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import { DatabaseError, EntityNotFoundError } from "../errors/customErrors";
import User from "../models/user";
import { compare } from "bcrypt";
import { signToken } from "../utils/authToken";

export const loginRouter = express.Router();

// This logic could be moved to a controller. TDO
loginRouter.post(
  "/login",
  catchErrors(async function (req, res, _next) {
    const { username, password } = req?.body;

    const user: User | null = await User.findOne({ where: { username } }).catch(
      () => {
        throw new DatabaseError();
      }
    );

    if (!user) {
      throw new EntityNotFoundError("Wrong user or password");
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new EntityNotFoundError("Wrong user or password");
    }
    const data = signToken({ uid: user.id });
    res.json({ token: data });
  })
);
