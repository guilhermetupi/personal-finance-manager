import * as Express from "express";
import { BalanceRoute } from "@/adapters/http/express/routes";
import { HttpRouteAdapterPort } from "@/ports/http";
import { getActualBalancePresenter } from "../../presenters";

class BalanceRouteFactory {
  public readonly balanceRoute: HttpRouteAdapterPort<Express.Router>;

  constructor() {
    this.balanceRoute = new BalanceRoute(getActualBalancePresenter);
  }
}

export const { balanceRoute } = new BalanceRouteFactory();
