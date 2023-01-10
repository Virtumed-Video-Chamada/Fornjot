"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));
var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/Fakes/FakeAppointmentsRepository"));
var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeAppointmentRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: "123456",
      provider_id: "123123"
    });
    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123");
  });
  it("should not be able to create two appointments on the same date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 6, 16, 13, 0, 0).getTime();
    });
    const appointmentDate = new Date(2020, 6, 16, 16, 0, 0);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: "user_id",
      provider_id: "provider-id"
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: "user_id",
      provider_id: "provider-id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: "123456",
      provider_id: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: "123123",
      provider_id: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create an appointment before 8am and after 5pm", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: "123123",
      provider_id: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: "123123",
      provider_id: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});