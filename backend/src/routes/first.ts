import express from "express";

export const firstRouter = express.Router();

firstRouter.get("/", function (_req, res, _next) {
  res.json("First Route YAAAAA!!");
});
