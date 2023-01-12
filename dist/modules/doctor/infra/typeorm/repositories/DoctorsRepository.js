"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("../../../../../shared/infra/typeorm");
var _uuidv = require("uuidv4");
var _User = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DoctorsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _typeorm.PostgresDataSource.getRepository(_User.default);
  }
  async updateDoctor(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['doctor']
    });
    return user;
  }
  async findAllDoctors() {
    const user = await this.ormRepository.find({
      where: {
        role: 'DOCTOR'
      }
    });
    return user;
  }
  async findById(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }
  async createDoctor(userData) {
    const user = this.ormRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'DOCTOR',
      doctor: {
        id: (0, _uuidv.uuid)(),
        cep: '',
        cpf: '',
        crm: '',
        address: '',
        city: '',
        district: '',
        number: ''
      }
    });
    await this.ormRepository.save(user);
    return user;
  }
  async save(user) {
    return this.ormRepository.save(user);
  }
}
var _default = DoctorsRepository;
exports.default = _default;