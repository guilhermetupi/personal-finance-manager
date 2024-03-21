import { ExpressHttpAdapter } from "@/adapters/http/express";
import { HttpAdapterPort } from "@/ports/http";
import { BalanceExpressRouteAdapter } from "./routes";
import { ormDatabaseAdapter } from "../../orm";

export class ExpressHttpAdapterFactory {
  public readonly expressHttpAdapter: HttpAdapterPort;
  
  constructor() {
    this.expressHttpAdapter = new ExpressHttpAdapter(
      [BalanceExpressRouteAdapter],
      ormDatabaseAdapter
    );
  }
}

export const { expressHttpAdapter } = new ExpressHttpAdapterFactory();
