import { OrmGetActualBalanceRepository } from "@/adapters/orm/repositories";
import { GetActualBalanceRepositoryPort } from "@/ports/database/repositories";
import { dataSource } from "../orm.factory";

class OrmGetActualBalanceRepositoryFactory {
  public readonly ormGetActualBalanceRepository: GetActualBalanceRepositoryPort;

  constructor() {
    this.ormGetActualBalanceRepository = new OrmGetActualBalanceRepository(
      dataSource
    );
  }
}

export const { ormGetActualBalanceRepository } =
  new OrmGetActualBalanceRepositoryFactory();
