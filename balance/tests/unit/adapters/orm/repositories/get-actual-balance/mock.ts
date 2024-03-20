import { OrmGetActualBalanceRepository } from "@/adapters/orm/repositories";
import { DataSource } from "typeorm";

export async function makeSut(dataSource: DataSource) {
  const sut = new OrmGetActualBalanceRepository(dataSource);

  return { sut };
}
