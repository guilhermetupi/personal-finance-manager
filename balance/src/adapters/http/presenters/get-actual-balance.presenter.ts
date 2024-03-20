import { Balance } from "@/domain/entities";
import { InternalServerError, NotFoundError } from "@/domain/errors";
import { GetActualBalancePresenterPort } from "@/ports/presenters";
import { GetActualBalanceUseCasePort } from "@/ports/usecases";
import { Response } from "@/types/presenters";

export class GetActualBalancePresenter
  implements GetActualBalancePresenterPort
{
  constructor(
    private readonly getActualBalanceUseCase: GetActualBalanceUseCasePort
  ) {}

  async execute(userId: string): Promise<Response<Balance>> {
    const balance = await this.getActualBalanceUseCase.execute(userId);

    if (balance instanceof NotFoundError) {
      return {
        success: true,
        data: null,
      };
    }

    if (balance instanceof InternalServerError) {
      return {
        success: false,
        data: null,
        message: balance.message,
      };
    }

    return {
      success: true,
      data: balance,
    };
  }
}
