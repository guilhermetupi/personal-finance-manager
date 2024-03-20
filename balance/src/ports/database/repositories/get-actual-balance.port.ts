import { Balance } from "@/domain/entities";
import { InternalServerError, NotFoundError } from "@/domain/errors";

export abstract class GetActualBalanceRepositoryPort {
  abstract execute(
    userId: string
  ): Promise<Balance | InternalServerError | undefined>;
}
