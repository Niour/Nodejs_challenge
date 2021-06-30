import { Sequelize } from "sequelize-typescript";
import User from "./user";

export const sequelize = new Sequelize({
  database: String(process.env.POSTGRE_HOSTNAME),
  username: String(process.env.POSTGRE_USERNAME),
  password: String(process.env.POSTGRE_PASSWORD),
  dialect: "postgres",
  host: "postgre_1",
  models: [User],
});