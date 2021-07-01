import express from "express";
import { catchErrors } from "../errors/asyncCatch";
import { EntityAlreadyExistError } from "../errors/customErrors";
import Company from "../models/company";
import User from "../models/user";

export const companyRouter = express.Router();

companyRouter.post(
  "/company/create",
  catchErrors(async function (req, res, _next) {
    const { companyName, jobs } = req?.body;
    const user: User = res.locals.currentUser;
    const exists = await Company.findOne({ where: { companyName } });
    if (!exists) {
      const data = await user.$create("comp", { companyName, jobs });
      // console.log(data);
      //   console.log(jobs);
      res.json(data);
    } else {
      throw new EntityAlreadyExistError("Company");
    }
  })
);

companyRouter.get(
  "/company",
  catchErrors(async function (_req, res, _next) {
    const user: User = res.locals.currentUser;

    const data = await user.$get("comp", {
      attributes: ["companyName", "jobs"],
    });

    res.json(data);
  })
);
