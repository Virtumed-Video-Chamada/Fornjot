"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _FakeMailProvider = _interopRequireDefault(require("../../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));
var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));
var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUserTokensRepository"));
var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeMailProvider;
let sendForgotPasswordEmail;
describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456"
    });
    await sendForgotPasswordEmail.execute({
      email: "johndoe@exemple.com"
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to recover a non-existig user password", async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: "johndoe@exemple.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@exemple.com",
      password: "123456"
    });
    await sendForgotPasswordEmail.execute({
      email: "johndoe@exemple.com"
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});