import { DataSource, Repository } from "typeorm";
import { setupTestDataSource } from "@/config/ormconfig";
import { BalanceModel } from "@/adapters/orm/models";
import { makeSut } from "./mock";
import { InternalServerError } from "@/domain/errors";

describe("GetActualBalance OrmRepository", () => {
  const userId = "any_user_id";
  let dataSource: DataSource;
  let repository: Repository<BalanceModel>;

  beforeAll(async () => {
    dataSource = await setupTestDataSource([BalanceModel]);
    repository = dataSource.getRepository(BalanceModel);
  });

  beforeEach(() => {
    dataSource.getRepository(BalanceModel).clear();
  });

  it("should return the actual balance", async () => {
    const balance = {
      userId,
      amount: 100,
      updatedAt: new Date(),
    };
    await repository.insert(balance);
    const { sut } = await makeSut(dataSource);

    const response = await sut.execute(userId);

    expect(response).toEqual(balance);
  });

  it("should return undefined if balance not found", async () => {
    const { sut } = await makeSut(dataSource);

    const response = await sut.execute(userId);

    expect(response).toBe(undefined);
  });

  it("should return InternalServerError if findOne throws", async () => {
    jest.spyOn(repository, "findOne").mockRejectedValue(new Error());
    const { sut } = await makeSut(dataSource);

    const response = await sut.execute(userId);

    expect((response as InternalServerError).message).toBe(
      "Error getting actual balance."
    );
  });

  it("should call repository.findOne with correct values", async () => {
    const findOneSpy = jest.spyOn(repository, "findOne");
    const { sut } = await makeSut(dataSource);

    await sut.execute(userId);

    expect(findOneSpy).toHaveBeenCalledWith({ where: { userId } });
  });
});
