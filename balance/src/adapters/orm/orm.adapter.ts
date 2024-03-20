import { dataSource } from "@/config/factories/adapters/orm";
import { DatabaseAdapterPort } from "@/ports/database";

export class OrmDatabaseAdapter implements DatabaseAdapterPort {
  async connect(): Promise<void> {
    await dataSource.initialize();
  }
}
