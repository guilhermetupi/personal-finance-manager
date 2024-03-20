import { GetActualBalanceUseCase } from "@/domain/usecases";
import { GetActualBalanceUseCasePort } from "@/ports/usecases";
import { ormGetActualBalanceRepository } from "../../adapters/orm/repositories";
class GetActualBalanceUseCaseFactory {
  public readonly getActualBalanceUseCase: GetActualBalanceUseCasePort;

  constructor() {
    this.getActualBalanceUseCase = new GetActualBalanceUseCase(
      ormGetActualBalanceRepository
    );
  }
}

export const { getActualBalanceUseCase } = new GetActualBalanceUseCaseFactory();
