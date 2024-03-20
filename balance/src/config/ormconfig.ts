import {
  DataSource,
  DataSourceOptions,
  EntitySchema,
  MixedList,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const appDataSouceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "balance",
  entities: [__dirname + "/../adapters/orm/models/**/*.model{.ts,.js}"],
  migrations: [__dirname + "/../adapters/orm/migrations/**/*{.ts,.js}"],
  namingStrategy: new SnakeNamingStrategy(),
  useUTC: true,
};

const testDataSouceOptions: DataSourceOptions = {
  type: "better-sqlite3",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  migrationsRun: true,
  entities: [__dirname + "/../adapters/orm/models/**/*.model{.ts,.js}"],
  migrations: [__dirname + "/../adapters/orm/migrations/**/*{.ts,.js}"],
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource = new DataSource(appDataSouceOptions);

export async function setupTestDataSource(
  entities: MixedList<string | Function | EntitySchema<any>> | undefined
): Promise<DataSource> {
  const testDataSource = new DataSource({
    type: "better-sqlite3",
    database: ":memory:",
    dropSchema: true,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities,
  });

  await testDataSource.initialize();

  return testDataSource;
}
