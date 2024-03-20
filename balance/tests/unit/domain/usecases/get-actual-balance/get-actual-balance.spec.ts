import { Balance } from "@/domain/entities";
import { makeSut } from "./mock";
import { InternalServerError, NotFoundError } from "@/domain/errors";

describe("GetActualBalance Usecase", () => {
  const userId = "any_user_id";

  it("should return the actual balance", async () => {
    const updatedAt = new Date();
    const balance = new Balance(100, userId, updatedAt);
    const { sut, getActualBalanceRepositoryStub } = makeSut();
    jest
      .spyOn(getActualBalanceRepositoryStub, "execute")
      .mockResolvedValue(balance);

    const response = await sut.execute(userId);

    expect(response).toEqual(balance);
  });

  it("should return a NotFoundError if the balance is not found", async () => {
    const { sut, getActualBalanceRepositoryStub } = makeSut();
    jest
      .spyOn(getActualBalanceRepositoryStub, "execute")
      .mockResolvedValue(undefined);

    const response = await sut.execute(userId);

    expect((response as NotFoundError).message).toBe("Balance not found");
  });

  it("should return a InternalServerError if the balance is not found", async () => {
    const { sut, getActualBalanceRepositoryStub } = makeSut();
    jest
      .spyOn(getActualBalanceRepositoryStub, "execute")
      .mockResolvedValue(new InternalServerError());

    const response = await sut.execute(userId);

    expect((response as InternalServerError).message).toBe(
      "Internal Server Error"
    );
  });

  it("should call GetActualBalanceRepository with the correct values", async () => {
    const { sut, getActualBalanceRepositoryStub } = makeSut();
    const executeSpy = jest.spyOn(getActualBalanceRepositoryStub, "execute");

    await sut.execute(userId);

    expect(executeSpy).toHaveBeenCalledWith(userId);
  });
});
