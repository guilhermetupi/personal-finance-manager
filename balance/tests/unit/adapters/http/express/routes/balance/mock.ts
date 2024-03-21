import { BalanceExpressRouteAdapter } from "@/adapters/http/express/routes";
import { GetActualBalancePresenterPort } from "@/ports/presenters";
import { Balance } from "@/domain/entities";
import { Response } from "@/types/presenters";

class GetActualBalancePresenterStub implements GetActualBalancePresenterPort {
  async execute(userId: string): Promise<Response<Balance>> {
    return new Promise((resolve) => {
      resolve({
        success: true,
        data: null,
      });
    });
  }
}

export function makeSut() {
  const getActualBalancePresenterStub = new GetActualBalancePresenterStub();
  const sut = new BalanceExpressRouteAdapter(getActualBalancePresenterStub);
  return { sut, getActualBalancePresenterStub };
}
