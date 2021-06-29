import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  String(process.env.MYSQL_HOSTNAME),
  String(process.env.MYSQL_USERNAME),
  String(process.env.MYSQL_PASSWORD),
  {
    dialect: "mysql",
    host: "mysql_1",
  }
);
