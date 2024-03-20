import { Balance } from "@/domain/entities";
import { makeSut } from "./mock";
import { InternalServerError, NotFoundError } from "@/domain/errors";

describe("GetActualBalance Presenter", () => {
  const userId = "any_user_id";

  it("should return balance correctly formatted", async () => {
    const balance = new Balance(100, userId, new Date());
    const { sut, getActualBalanceUseCaseStub } = makeSut();
    jest
      .spyOn(getActualBalanceUseCaseStub, "execute")
      .mockResolvedValue(balance);

    const result = await sut.execute(userId);

    expect(result).toEqual({
      success: true,
      data: balance,
    });
  });

  it("should return data null correctly formatted if balance not found", async () => {
    const { sut, getActualBalanceUseCaseStub } = makeSut();
    jest
      .spyOn(getActualBalanceUseCaseStub, "execute")
      .mockResolvedValue(new NotFoundError("Balance not found"));

    const result = await sut.execute(userId);

    expect(result).toEqual({
      success: true,
      data: null,
    });
  });

  it("should return message correctly formatted if internal server error", async () => {
    const { sut, getActualBalanceUseCaseStub } = makeSut();
    jest
      .spyOn(getActualBalanceUseCaseStub, "execute")
      .mockResolvedValue(new InternalServerError("Internal server error"));

    const result = await sut.execute(userId);

    expect(result).toEqual({
      success: false,
      data: null,
      message: "Internal server error",
    });
  });
});
