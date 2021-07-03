import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Company from "./company";

@Table({
  timestamps: true,
  paranoid: true,
})
class Job extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  title!: string;

  @ForeignKey(() => Company)
  @Column
  companyId!: number;

  @Column({ type: DataType.TEXT })
  description!: string;
}

export default Job;
