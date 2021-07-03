import { RequestHandler } from "express";
import Log from "../models/log";

export const logTime: RequestHandler = (_req, res, next) => {
  res.locals.time = new Date().getTime();
  next();
};

export const loggingOnFinish: RequestHandler = (req, res, next) => {
  req.on("close", () => {
    const path = req?.route?.path;
    const route = Array.isArray(path) ? path.join("|") : path;

    const milliseconds: number = new Date().getTime() - res.locals.time;

    Log.create({
      uid: res?.locals?.currentUser?.id ?? -1,
      method: req?.method ?? "",
      path: path ?? "",
      route: route !== ("" || undefined) ? route : req?.originalUrl ?? "",
      status: res?.statusCode ?? "",
      milliseconds,
    }).catch((err) => {
      console.log(err);
    });
  });
  next();
};
