import { Table, Column, Model } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
})
class Log extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  uid?: number;

  @Column
  method!: string;

  @Column
  path!: string;

  @Column
  route!: string;

  @Column
  status!: number;

  @Column
  milliseconds!: number;
}

export default Log;
