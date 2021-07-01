// import {
//     Table,
//     Column,
//     Model,
//     ForeignKey,
//     BelongsTo,
//   } from "sequelize-typescript";
//   import User from "./user";

//   @Table({
//     timestamps: true,
//     paranoid: true,
//   })
//   class Job extends Model {
//     @Column({ primaryKey: true, autoIncrement: true })
//     id!: number;

//     @Column
//     JobName!: string;

//     @ForeignKey(() => User)
//     @Column
//     jobUserId!: number;

//     @BelongsTo(() => User, "id")
//     userCompany!: User;

//     @Column
//     jobs!: string;
//   }

//   export default Job;
