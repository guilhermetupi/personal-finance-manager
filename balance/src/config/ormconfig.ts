import { DataSource, EntitySchema, MixedList } from "typeorm";

export async function setupTestDataSourceModels(
  entities: MixedList<string | Function | EntitySchema<any>> | undefined
): Promise<DataSource> {
  const testDataSource = new DataSource({
    type: "better-sqlite3",
    database: ":memory:",
    dropSchema: true,
    synchronize: true,
    entities,
  });

  await testDataSource.initialize();

  return testDataSource;
}
