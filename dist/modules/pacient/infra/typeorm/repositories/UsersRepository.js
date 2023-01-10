"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _typeorm2 = require("../../../../../shared/infra/typeorm");
var _User = _interopRequireDefault(require("../entities/User"));
var _uuidv = require("uuidv4");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _typeorm2.PostgresDataSource.getRepository(_User.default);
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
  async updateClinic(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['doctor']
    });
    return user;
  }
  async updatePacient(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['doctor']
    });
    return user;
  }
  async findAllDoctors() {
    const user = await this.ormRepository.findOne({
      where: {
        role: 'DOCTOR'
      }
    });
    return user;
  }
  async findAllPacients() {
    const user = await this.ormRepository.findOne({
      where: {
        role: 'PACIENT'
      }
    });
    return user;
  }
  async findAllClinics() {
    const user = await this.ormRepository.findOne({
      where: {
        role: 'CLINIC'
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
  async findAllProviders({
    expect_user_id
  }) {
    let users;
    if (expect_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm.Not)(expect_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
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
  async createPacient(userData) {
    const user = this.ormRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'PACIENT',
      pacient: {
        id: (0, _uuidv.uuid)(),
        rg: '',
        cep: '',
        cpf: '',
        address: '',
        city: '',
        district: '',
        number: ''
      }
    });
    await this.ormRepository.save(user);
    return user;
  }
  async createClinic(userData) {
    const user = this.ormRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'CLINIC',
      clinic: {
        id: (0, _uuidv.uuid)(),
        corporate_name: '',
        cnpj: '',
        cep: '',
        cpf: '',
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
var _default = UsersRepository;
exports.default = _default;