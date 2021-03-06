import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import Log from "../models/log";

export const logRouter = express.Router();

// TDO. This route should get protected with permissions.
logRouter.get(
  "/logs",
  catchErrors(async function (_req, res, _next) {
    const data = await Log.findAll().catch(() => {});
    res.json(data);
  })
);
