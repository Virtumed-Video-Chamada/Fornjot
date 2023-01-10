"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _IDoctorRepository = _interopRequireDefault(require("../../repositories/IDoctorRepository"));
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UpdateDoctorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("DoctorsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDoctorRepository.default === "undefined" ? Object : _IDoctorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateDoctorService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    id,
    cep,
    cpf,
    crm
  }) {
    const user = await this.usersRepository.updateDoctor(id);
    if (!user) {
      throw new _AppError.default("User not found.");
    }
    user.doctor.cep = cep;
    user.doctor.cpf = cpf;
    user.doctor.crm = crm;
    await this.usersRepository.save(user);
    return user;
  }
}) || _class) || _class) || _class) || _class);
var _default = UpdateDoctorService;
exports.default = _default;