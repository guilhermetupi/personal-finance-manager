import { GetActualBalanceRepositoryPort } from "@/ports/database/repositories";
import { DataSource, Repository } from "typeorm";
import { BalanceModel } from "../models";
import { Balance } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";
import { BalanceMapper } from "./mappers/balance-model-to-balance-entity.mapper";

export class OrmGetActualBalanceRepository
  implements GetActualBalanceRepositoryPort
{
  private readonly repository: Repository<BalanceModel>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(BalanceModel);
  }

  async execute(
    userId: string
  ): Promise<Balance | InternalServerError | undefined> {
    try {
      const balanceModel = await this.repository.findOne({ where: { userId } });
      if (!balanceModel) return;

      const balanceEntity = BalanceMapper.toEntity(balanceModel);
      return balanceEntity;
    } catch {
      return new InternalServerError("Error getting actual balance.");
    }
  }
}
