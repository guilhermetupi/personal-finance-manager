import { GetActualBalancePresenter } from "@/adapters/http/presenters";
import { Balance } from "@/domain/entities";
import { NotFoundError, InternalServerError } from "@/domain/errors";
import { GetActualBalanceUseCasePort } from "@/ports/usecases";

class GetAcutalBalanceUseCaseStub implements GetActualBalanceUseCasePort {
  async execute(
    userId: string
  ): Promise<Balance | NotFoundError | InternalServerError> {
    return new Promise((resolve) => resolve({} as Balance));
  }
}

export function makeSut() {
  const getActualBalanceUseCaseStub = new GetAcutalBalanceUseCaseStub();
  const sut = new GetActualBalancePresenter(getActualBalanceUseCaseStub);

  return { sut, getActualBalanceUseCaseStub };
}
