"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuidv = require("uuidv4");
var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FakeUsersRepository {
  constructor() {
    this.users = [];
  }
  async findById(id) {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }
  async findByEmail(email) {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }
  async findAllProviders({
    expect_user_id
  }) {
    let {
      users
    } = this;
    if (expect_user_id) {
      users = this.users.filter(user => user.id !== expect_user_id);
    }
    return users;
  }
  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)()
    }, userData);
    this.users.push(user);
    return user;
  }
  async save(user) {
    const userIndex = this.users.findIndex(findIndex => findIndex.id === user.id);
    this.users[userIndex] = user;
    return user;
  }
}
var _default = FakeUsersRepository;
exports.default = _default;