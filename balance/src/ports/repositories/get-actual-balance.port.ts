import { Balance } from "@/domain/entities";
import { InternalServerError } from "@/domain/errors";

export abstract class GetActualBalanceRepositoryPort {
  abstract execute(
    userId: string
  ): Promise<Balance | InternalServerError | undefined>;
}
