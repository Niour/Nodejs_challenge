import { Table, Column, Model, BeforeCreate } from "sequelize-typescript";
import { hash } from "bcrypt";

@Table({
  timestamps: true,
  paranoid: true,
})
class User extends Model {
  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password, 10);
  }
}

export default User;
