import { Balance } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";
import { GetActualBalanceUseCase } from "@/domain/usecases";
import { GetActualBalanceRepositoryPort } from "@/ports/database/repositories";

class GetActualBalanceRepositoryStub implements GetActualBalanceRepositoryPort {
  async execute(
    userId: string
  ): Promise<Balance | InternalServerError | undefined> {
    return new Promise<undefined>((resolve) => resolve(undefined));
  }
}

export function makeSut() {
  const getActualBalanceRepositoryStub = new GetActualBalanceRepositoryStub();
  const sut = new GetActualBalanceUseCase(getActualBalanceRepositoryStub);

  return { sut, getActualBalanceRepositoryStub };
}
