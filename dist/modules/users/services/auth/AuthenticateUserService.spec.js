"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));
var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import AppError from "@shared/errors/AppError";

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it("should be able to authenticate", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456"
    });
    const response = await authenticateUser.execute({
      email: "johndoe@exemple.com",
      password: "123456"
    });
    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });
  it("should be not able to authenticate with a non existing user", async () => {
    await expect(authenticateUser.execute({
      email: "johndoe@exemple.com",
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should be not able to authenticate with wrong password", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456"
    });
    await expect(authenticateUser.execute({
      email: "johndoe@exemple.com",
      password: "12345"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});