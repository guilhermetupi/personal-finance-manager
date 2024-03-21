import * as Express from "express";
import { HttpRouteAdapterPort } from "@/ports/http";
import { BalanceExpressRouteAdapter } from "@/adapters/http/express/routes";
import { getActualBalancePresenter } from "../../presenters";

class BalanceExpressRouteAdapterFactory {
  public readonly balanceExpressRouteAdapter: HttpRouteAdapterPort<Express.Router>;

  constructor() {
    this.balanceExpressRouteAdapter = new BalanceExpressRouteAdapter(
      getActualBalancePresenter
    );
  }
}

export const { balanceExpressRouteAdapter } =
  new BalanceExpressRouteAdapterFactory();
