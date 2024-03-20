;import { GetActualBalanceRepositoryPort } from "@/ports/database/repositories";
import { Balance } from "../entities";
import { InternalServerError, NotFoundError } from "../errors";
import { GetActualBalanceUseCasePort } from "@/ports/usecases";

export class GetActualBalanceUseCase implements GetActualBalanceUseCasePort {
  constructor(
    private readonly getActualBalanceRepository: GetActualBalanceRepositoryPort
  ) {}
  
  async execute(
    userId: string
  ): Promise<Balance | InternalServerError | NotFoundError> {
    const balance = await this.getActualBalanceRepository.execute(
      userId
    );

    if (!balance) {
      return new NotFoundError("Balance not found");
    }

    return balance;
  }
}
