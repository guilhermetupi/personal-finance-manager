import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("balance")
export class BalanceModel {
  @PrimaryColumn("uuid")
  userId: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  amount: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
