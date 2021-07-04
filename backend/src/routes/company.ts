import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import {
  AuthorizationError,
  EntityAlreadyExistError,
  EntityNotFoundError,
} from "../errors/customErrors";
import Company from "../models/company";
import User from "../models/user";

export const companyRouter = express.Router();

companyRouter.post(
  "/company/create",
  catchErrors(async function (req, res, _next) {
    const { companyName } = req?.body;
    const user: User = res.locals.currentUser;
    const exists = await Company.findOne({ where: { companyName } });
    if (!exists) {
      const data = await user.$create("comp", { companyName });
      res.json(data);
    } else {
      throw new EntityAlreadyExistError("Company");
    }
  })
);

companyRouter.delete(
  "/company/delete",
  catchErrors(async function (req, res, _next) {
    const { companyId } = req?.body;
    // const user: User = res.locals.currentUser;
    const company = await Company.findOne({
      attributes: ["companyName", "id", "companyUserId"],
      where: { id: companyId },
    });
    if (!company) {
      throw new EntityNotFoundError("Company does not exist");
    } else if (company.companyUserId != res.locals.currentUser.id) {
      throw new AuthorizationError("Cant delete this Company");
    } else {
      company.destroy();
      res.status(200).json(company);
    }
  })
);

companyRouter.put(
  "/company/update",
  catchErrors(async function (req, res, _next) {
    const { companyId, newName } = req?.body;
    // const user: User = res.locals.currentUser;
    const company = await Company.findOne({
      attributes: ["companyName", "id", "companyUserId"],
      where: { id: companyId },
    });
    if (!company) {
      throw new EntityNotFoundError("Company does not exist");
    } else if (company.companyUserId != res.locals.currentUser.id) {
      throw new AuthorizationError("Cant Update this Company");
    } else {
      company.companyName = newName;
      company.save();
      res.status(200).json(company);
    }
  })
);

companyRouter.get(
  "/company",
  catchErrors(async function (_req, res, _next) {
    const user: User = res.locals.currentUser;
    const data = await user.$get("comp", {
      attributes: ["id", "companyName"],
    });
    res.json(data);
  })
);
