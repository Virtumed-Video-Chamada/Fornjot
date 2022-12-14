"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));
var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it("should be able to update user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tré",
      email: "johntre@example.com"
    });
    expect(updatedUser.name).toBe("John Tré");
    expect(updatedUser.email).toBe("johntre@example.com");
  });
  it("should not be able to update the profile from non-existing user", async () => {
    expect(updateProfile.execute({
      user_id: "non-existing-user-id",
      name: "Test",
      email: "test@example.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to change to another user e-mail", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "test@example.com",
      password: "123456"
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: "John Tré",
      email: "johndoe@example.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tré",
      email: "johntre@example.com",
      old_password: "123456",
      password: "123123"
    });
    expect(updatedUser.password).toBe("123123");
  });
  it("should not be able to update the password without the old passowrd", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: "John Tré",
      email: "johntre@example.com",
      password: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to update the password with wrong old passowrd", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: "John Tré",
      email: "johntre@example.com",
      old_password: "wrong-old-password",
      password: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});