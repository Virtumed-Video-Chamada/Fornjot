"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/CacheProvider/models/ICacheProvider"));
var _IHashProvider = _interopRequireDefault(require("../../../users/providers/HashProvider/models/IHashProvider"));
var _IDoctorRepository = _interopRequireDefault(require("../../repositories/IDoctorRepository"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let CreateDoctorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("DoctorsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CacheProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IDoctorRepository.default === "undefined" ? Object : _IDoctorRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateDoctorService {
  constructor(usersRepository, hashProvider, cacheProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.cacheProvider = cacheProvider;
  }
  async execute({
    name,
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new _AppError.default("E-mail already exists");
    }
    const passwordHash = await this.hashProvider.generateHash(password);
    const userExist = await this.usersRepository.createDoctor({
      name,
      email,
      password: passwordHash
    });
    await this.cacheProvider.invalidatePrefix("providers-list");
    return userExist;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateDoctorService;
exports.default = _default;