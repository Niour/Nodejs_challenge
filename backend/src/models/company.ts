import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import Job from "./job";
import User from "./user";

@Table({
  timestamps: true,
  paranoid: true,
})
class Company extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  companyName!: string;

  @ForeignKey(() => User)
  @Column
  companyUserId!: number;

  @HasMany(() => Job, "companyId")
  jobss!: Job[];
}

export default Company;
