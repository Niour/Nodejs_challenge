import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  String(process.env.POSTGRE_HOSTNAME),
  String(process.env.POSTGRE_USERNAME),
  String(process.env.POSTGRE_PASSWORD),
  {
    dialect: "postgres",
    host: "postgre_1",
  }
);
