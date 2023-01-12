"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Notification = _interopRequireDefault(require("../schemas/Notification"));
var _typeorm = require("../../../../../shared/infra/typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NotificationsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _typeorm.MongoDataSource.getMongoRepository(_Notification.default);
  }
  async create({
    content,
    recipient_id
  }) {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    });
    await this.ormRepository.save(notification);
    return notification;
  }
}
var _default = NotificationsRepository;
exports.default = _default;