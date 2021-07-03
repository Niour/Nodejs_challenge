import { Schema, ValidationResult } from "joi";
import { CustomValidationError } from "../errors/customErrors";

const Joi = require("joi");

export const numberschema: Schema = Joi.number();

export function validate<T>(obj: T, schema: Schema, value: string): void {
  const result: ValidationResult = schema.validate(obj);
  if (result.error) {
    throw new CustomValidationError(result, value);
  }
}
