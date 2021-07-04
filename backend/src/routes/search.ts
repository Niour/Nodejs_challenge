import express from "express";
import Joi from "joi";
import { Op } from "sequelize";
import { catchErrors } from "../errors/asyncCatch";
import Job from "../models/job";
import { validate } from "../utils/validation";

export const searchRouter = express.Router();

searchRouter.get(
  "/search",
  catchErrors(async function (req, res, _next) {
    validate(req.query.search, Joi.string().required(), "search");

    let data: Job[] = [];

    data = await Job.findAll({
      attributes: ["id", "title", "description"],
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${req.query.search}%` },
          description: { [Op.like]: `${req.query.search}` },
        },
      },
    });

    res.json(data);
  })
);
