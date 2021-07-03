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
    console.log(req.query.company);

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
      attributes: [["id", "CompanyID"]],
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
  validateBody(numberschema.required(), "jobId"),
  catchErrors(async function (req, res, _next) {
    const { jobId } = req?.body;
    console.log(jobId);

    const job = await Job.findOne({
      attributes: ["id"],
      include: [
        {
          model: Company,
          attributes: ["id"],
          include: [
            {
              model: User,
              attributes: ["id"],
            },
          ],
        },
      ],
      where: { id: jobId },
    });

    if (!job) {
      throw new EntityNotFoundError("Job does not exist");
    } else if (job.jobToCompany.companyToUser.id != res.locals.currentUser.id) {
      throw new AuthorizationError("Cant delete this Job");
    } else {
      job.destroy();
      res.status(200).json({ id: job.id });
    }
  })
);

jobRouter.put(
  "/job/update",
  validateBody(numberschema.required(), "jobId"),
  validateBody(Joi.string().required(), "title"),
  validateBody(Joi.string().required(), "description"),
  catchErrors(async function (req, res, _next) {
    const { jobId, title, description } = req?.body;

    const job = await Job.findOne({
      attributes: ["title", "id", "companyId"],
      include: {
        model: Company,
        attributes: ["id"],
      },
      where: { id: jobId },
    });

    if (!job) {
      throw new EntityNotFoundError("Job does not exist");
    } else if (job.jobToCompany.id != res.locals.currentUser.id) {
      throw new AuthorizationError("Cant delete this Job");
    } else {
      job.title = title;
      job.description = description;
      job.save();
      res.status(200).json(job);
    }
  })
);
