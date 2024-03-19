import { Balance } from "@/domain/entities";
import { InternalServerError, NotFoundError } from "@/domain/errors";

export abstract class GetActualBalanceUseCasePort {
  abstract execute(
    userId: string
  ): Promise<Balance | NotFoundError | InternalServerError>;
}
