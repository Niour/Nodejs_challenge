import express from "express";
import Joi from "joi";
import { Model } from "sequelize/types";
import { catchErrors } from "../errors/asyncCatch";
import {
  AuthorizationError,
  EntityNotFoundError,
} from "../errors/customErrors";
import { validateBody } from "../middleware/validateMidleware";
import Company from "../models/company";
import Job from "../models/job";
import User from "../models/user";
import { numberschema, validate } from "../utils/validation";

export const jobRouter = express.Router();

jobRouter.get(
  "/jobs",
  catchErrors(async function (req, res, _next) {
    validate(
      req.query.company,
      Joi.array().items(numberschema).single(),
      "company"
    );

    const query = req.query.company as string[] | string | undefined;
    let data: Company[] = [];
    let companyId: number[] = [];
    if (typeof query != "undefined") {
      if (typeof query === "string") {
        companyId = [+query];
      } else if (
        typeof query != "undefined" &&
        typeof query.length != "undefined"
      ) {
        companyId = query.map((item: any) => {
          return +item;
        }) as number[];
      }
    }
    data = await Company.findAll({
      attributes: ["id"],
      where: { ...(req?.query?.company && { id: companyId }) },
      include: [
        {
          model: Job,
          attributes: ["id", "title", "description"],
        },
      ],
    });

    res.json(data);
  })
);

jobRouter.post(
  "/job/create",
  validateBody(numberschema.required(), "companyId"),
  validateBody(Joi.string().required(), "title"),
  validateBody(Joi.string().required(), "description"),
  catchErrors(async function (req, res, _next) {
    const { companyId, title, description } = req?.body;

    const user: User = res.locals.currentUser;
    let data: Model<Company, Job> | never[] = [];
    const exists = await Company.findOne({ where: { id: companyId } });

    if (!exists) {
      throw new EntityNotFoundError("Company");
    } else if (exists.companyUserId != user.id) {
      throw new AuthorizationError("Not authorized company");
    } else {
      data = await exists.$create("jobss", { title, description });
    }
    res.json(data);
  })
);

jobRouter.delete(
  "/job/delete",
  catchErrors(async function (req, res, _next) {
    const { jobId } = req?.body;
    // const user: User = res.locals.currentUser;
    const job = await Job.findOne({
      attributes: ["title", "id"],
      where: { id: jobId },
    });
    if (!job) {
      throw new EntityNotFoundError("Job does not exist");
    } else if (job.id != res.locals.currentUser.id) {
      throw new AuthorizationError("Cant delete this Job");
    } else {
      job.destroy();
      res.status(200).json(job);
    }
  })
);

jobRouter.put(
  "/job/update",
  catchErrors(async function (req, res, _next) {
    const { jobId, newName } = req?.body;
    // const user: User = res.locals.currentUser;
    const job = await Job.findOne({
      attributes: ["title", "id", "companyId"],
      where: { id: jobId },
    });
    if (!job) {
      throw new EntityNotFoundError("Job does not exist");
    } else if (job.companyId != res.locals.currentUser.id) {
      throw new AuthorizationError("Cant Update this Job");
    } else {
      job.title = newName;
      job.save();
      res.status(200).json(job);
    }
  })
);

// jobRouter.get(
//   "/job/:id",
//   catchErrors(async function (req, res, _next) {
//     // const user: User = res.locals.currentUser;
//     const id: number = +req.params.id;

//     const data = await Job.findOne({
//       attributes: ["id", "title", "description"],
//       where: { id },
//     });
//     res.json(data);
//   })
// );
