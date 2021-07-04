import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
  BelongsTo,
  AfterDestroy,
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

  @HasMany(() => Job, {
    foreignKey: "companyId",
    hooks: true,
  })
  jobss!: Job[];

  @BelongsTo(() => User)
  companyToUser!: User;

  @AfterDestroy
  static async deleteJobs(instance: Company) {
    instance.$get("jobss").then((items: Job[]) => {
      items.map((item: Job) => {
        item.destroy();
      });
    });
  }
}

export default Company;
