import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { isPlainObject } from "lodash";

import { InvalidTokenError } from "../errors/customErrors";

// ... Options is there in case we need to get inside there more information like permissions etc.
// Also jwt.sign  is time safe in case of time attacks.
export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: "1hr",
    ...options,
  });

// jwt.verify is not time safe but in this case we are not subjects of time attacks.
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
