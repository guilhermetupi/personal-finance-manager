import { Balance } from "@/domain/entities";
import { BalanceModel } from "../../models";

export class BalanceMapper {
  static toEntity(balanceModel: BalanceModel): Balance {
    return new Balance(
      balanceModel.amount,
      balanceModel.userId,
      balanceModel.updatedAt
    );
  }
}
