import { DataSource, EntitySchema, MixedList } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "balance",
  entities: [__dirname + "/../adapters/orm/models/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../adapters/orm/migrations/**/*.entity{.ts,.js}"],
  namingStrategy: new SnakeNamingStrategy(),
});

export const TestDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  migrationsRun: true,
  entities: [__dirname + "/../adapters/orm/models/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../adapters/orm/migrations/**/*.entity{.ts,.js}"],
  namingStrategy: new SnakeNamingStrategy(),
});

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
