import { OrmDatabaseAdapter } from "@/adapters/orm/orm.adapter";
import { DatabaseAdapterPort } from "@/ports/database";

export class OrmDatabaseAdapterFactory {
  public readonly ormDatabaseAdapter: DatabaseAdapterPort;

  constructor() {
    this.ormDatabaseAdapter = new OrmDatabaseAdapter();
  }
}

export const { ormDatabaseAdapter } = new OrmDatabaseAdapterFactory();
