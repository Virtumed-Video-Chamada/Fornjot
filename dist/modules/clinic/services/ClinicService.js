"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _IDoctorRepository = _interopRequireDefault(require("../../doctor/repositories/IDoctorRepository"));
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClinicsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ClinicsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDoctorRepository.default === "undefined" ? Object : _IDoctorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ClinicsService {
  constructor(usersRepository)
  /* @inject("HashProvider")
  private hashProvider: IHashProvider,
  @inject("CacheProvider")
  private cacheProvider: ICacheProvider, */
  {
    this.usersRepository = usersRepository;
  }
  async execute() {
    const user = await this.usersRepository.findAllDoctors();
    return user;
  }
}) || _class) || _class) || _class) || _class);
var _default = ClinicsService;
exports.default = _default;