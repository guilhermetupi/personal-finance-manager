import { AppDataSource } from "@/config/ormconfig";
import { DataSource } from "typeorm";

export class OrmFactory {
  public readonly dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }
}

export const { dataSource } = new OrmFactory();
