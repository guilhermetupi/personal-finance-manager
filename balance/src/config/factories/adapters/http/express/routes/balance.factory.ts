import * as Express from "express";
import { BalanceExpressRouteAdapter } from "@/adapters/http/express/routes";
import { HttpRouteAdapterPort } from "@/ports/http";
import { getActualBalancePresenter } from "../../presenters";

class BalanceExpressRouteAdapterFactory {
  public readonly BalanceExpressRouteAdapter: HttpRouteAdapterPort<Express.Router>;

  constructor() {
    this.BalanceExpressRouteAdapter = new BalanceExpressRouteAdapter(getActualBalancePresenter);
  }
}

export const { BalanceExpressRouteAdapter } = new BalanceExpressRouteAdapterFactory();
