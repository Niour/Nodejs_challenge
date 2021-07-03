import { RequestHandler } from "express";
import { Schema } from "joi";
import { validate } from "../utils/validation";

export const validateBody =
  (schema: Schema, value: string): RequestHandler =>
  (req, _res, next) => {
    validate(req?.body[value], schema, value);

    next();
  };
