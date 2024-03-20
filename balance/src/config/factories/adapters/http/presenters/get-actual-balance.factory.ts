import { GetActualBalancePresenter } from "@/adapters/http/presenters";
import { getActualBalanceUseCase } from "@/config/factories/domain/usecases";
import { GetActualBalancePresenterPort } from "@/ports/presenters";

class GetActualBalancePresenterFactory {
  public readonly getActualBalancePresenter: GetActualBalancePresenterPort;

  constructor() {
    this.getActualBalancePresenter = new GetActualBalancePresenter(
      getActualBalanceUseCase
    );
  }
}

export const { getActualBalancePresenter } =
  new GetActualBalancePresenterFactory();
