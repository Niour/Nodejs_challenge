import { ErrorRequestHandler } from "express";
import { ValidationErrorItem } from "joi";
import { pick } from "lodash";

import { CustomError, CustomValidationError } from "../errors/customErrors";

interface ClientError {
  message: string;
  code: string | number;
  status: number;
}

export const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  let clientError: ClientError;
  if (error instanceof CustomValidationError) {
    clientError = {
      message: error.data.name,
      status: 400,
      code: "VALIDATION_ERROR",
    };
    error.error!.details.forEach((item: ValidationErrorItem) => {
      clientError.message = `${clientError.message}.${item.message}.`;
    });
  } else if (error instanceof CustomError) {
    clientError = pick(error, ["message", "code", "status"]);
  } else {
    clientError = {
      message: "Something went wrong, please contact our support.",
      code: "INTERNAL_ERROR",
      status: 500,
    };
  }

  res.status(clientError.status).send({ error: clientError });
};
