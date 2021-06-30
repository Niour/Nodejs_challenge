import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import User from "../models/user";

export const defaultRouter = express.Router();

defaultRouter.get(
  "/",
  catchErrors(async function (_req, res, _next) {
    const data = await User.findAll();
    res.json(data);
  })
);
