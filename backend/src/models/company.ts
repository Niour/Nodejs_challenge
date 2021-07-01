import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
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

  @BelongsTo(() => User, "id")
  userCompany!: User;

  @Column
  jobs!: string;
}

export default Company;
