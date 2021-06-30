import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { isPlainObject } from "lodash";

import { InvalidTokenError } from "../errors/customErrors";

export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: "1hr",
    ...options,
  });

export const verifyToken = (token: string): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);

    if (isPlainObject(payload)) {
      return payload as { [key: string]: any };
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};
