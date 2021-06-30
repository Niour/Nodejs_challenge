import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import User from "../models/user";

export const firstRouter = express.Router();

firstRouter.get(
  "/",
  catchErrors(async function (_req, res, _next) {
    const data = await User.findAll();
    // console.log(data);

    res.json(data);
  })
);

firstRouter.post(
  "/signup",
  catchErrors(async function (req, res, _next) {
    // console.log(req.body);

    const { username, email, password } = req?.body;
    const data = await User.create({ username, email, password });
    console.log(data);
    res.json(data);
  })
);
