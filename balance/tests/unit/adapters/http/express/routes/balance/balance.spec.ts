import { makeSut } from "./mock";
import { Balance } from "@/domain/entities";

jest.mock("express", () => ({ Router: jest.fn(() => ({ get: jest.fn() })) }));

describe("Balance ExpressRouteAdapter", () => {
  const userId = "any_user_id";

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should call router get with correct params", () => {
    const { sut } = makeSut();
    const router = require("express").Router();

    sut.setup(router);

    expect(router.get).toHaveBeenCalledWith("/:userId", expect.any(Function));
  });

  it("should call getActualBalancePresenter with correct params", async () => {
    const { sut, getActualBalancePresenterStub } = makeSut();
    const getActualBalancePresenterStubSpy = jest.spyOn(
      getActualBalancePresenterStub,
      "execute"
    );
    const router = require("express").Router();

    sut.setup(router);

    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await router.get.mock.calls[0][1](req, res);

    expect(getActualBalancePresenterStubSpy).toHaveBeenCalledWith(userId);
  });

  it("should return 200 if getActualBalancePresenter returns success", async () => {
    const { sut } = makeSut();
    const router = require("express").Router();

    sut.setup(router);

    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await router.get.mock.calls[0][1](req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return data if getActualBalancePresenter returns balance successfully", async () => {
    const { sut, getActualBalancePresenterStub } = makeSut();
    const balance = new Balance(100, userId, new Date());
    jest
      .spyOn(getActualBalancePresenterStub, "execute")
      .mockResolvedValue({ success: true, data: balance });
    const router = require("express").Router();

    sut.setup(router);

    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await router.get.mock.calls[0][1](req, res);

    expect(res.json).toHaveBeenCalledWith({ data: balance });
  });

  it("should return data null if getActualBalancePresenter returns null", async () => {
    const { sut, getActualBalancePresenterStub } = makeSut();
    jest
      .spyOn(getActualBalancePresenterStub, "execute")
      .mockResolvedValue({ success: true, data: null });
    const router = require("express").Router();

    sut.setup(router);

    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await router.get.mock.calls[0][1](req, res);

    expect(res.json).toHaveBeenCalledWith({ data: null });
  });

  it("should return 500 if getActualBalancePresenter returns success false", async () => {
    const { sut, getActualBalancePresenterStub } = makeSut();
    jest
      .spyOn(getActualBalancePresenterStub, "execute")
      .mockResolvedValue({ success: false, data: null });
    const router = require("express").Router();

    sut.setup(router);

    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await router.get.mock.calls[0][1](req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should return a message if getActualBalancePresenter returns success false", async () => {
    const { sut, getActualBalancePresenterStub } = makeSut();
    const message = "Error getting balance";
    jest
      .spyOn(getActualBalancePresenterStub, "execute")
      .mockResolvedValue({ success: false, data: null, message });
    const router = require("express").Router();

    sut.setup(router);

    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await router.get.mock.calls[0][1](req, res);

    expect(res.json).toHaveBeenCalledWith({ message });
  });
});
