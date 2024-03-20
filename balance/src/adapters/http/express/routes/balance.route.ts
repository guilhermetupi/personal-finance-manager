import * as Express from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { GetActualBalancePresenterPort } from "@/ports/presenters";

export class BalanceRoute implements HttpRouteAdapterPort<Express.Router> {
  public readonly name = "balance";

  constructor(
    private readonly getActualBalancePresenter: GetActualBalancePresenterPort
  ) {}

  setup(router: Express.Router): void {
    router.get("/:userId", async (req, res) => {
      const { userId } = req.params;
      const response = await this.getActualBalancePresenter.execute(userId);

      if (response.success) {
        return res.status(200).json({ data: response.data });
      }

      return res.status(500).json({ message: response.message });
    });
  }
}
