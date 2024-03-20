import { Balance } from "@/domain/entities";
import { Response } from "@/types/presenters";

export abstract class GetActualBalancePresenterPort {
  abstract execute(userId: string): Promise<Response<Balance>>;
}
