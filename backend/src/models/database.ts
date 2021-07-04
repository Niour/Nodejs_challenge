import { Sequelize } from "sequelize-typescript";
import Company from "./company";
import Job from "./job";
import Log from "./log";
import User from "./user";

export const sequelize = new Sequelize({
  database: String(process.env.POSTGRE_HOSTNAME),
  username: String(process.env.POSTGRE_USERNAME),
  password: String(process.env.POSTGRE_PASSWORD),
  dialect: "postgres",
  host: "postgre_1",
  models: [User, Company, Job, Log],
  logging: process.env.DEVE ? false : true,
});
