import {
  Table,
  Column,
  Model,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";
import { hash } from "bcrypt";
import Company from "./company";

@Table({
  modelName: "User",
  timestamps: true,
  paranoid: true,
})
class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @HasMany(() => Company, "companyUserId")
  comp!: Company[];

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password, 10);
  }
}

export default User;
