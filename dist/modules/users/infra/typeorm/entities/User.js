"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _classTransformer = require("class-transformer");
var _upload = _interopRequireDefault(require("../../../../../config/upload"));
var _Doctor = _interopRequireDefault(require("../../../../doctor/infra/typeorm/entities/Doctor"));
var _Pacient = _interopRequireDefault(require("../../../../pacient/infra/typeorm/entities/Pacient"));
var _Clinic = _interopRequireDefault(require("../../../../clinic/infra/typeorm/entities/Clinic"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let User = (_dec = (0, _typeorm.Entity)("users"), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)("uuid"), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)("varchar"), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)("varchar"), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)("varchar"), _dec9 = (0, _classTransformer.Exclude)(), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _typeorm.Column)({
  type: 'varchar'
}), _dec12 = (0, _classTransformer.Exclude)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.OneToOne)(() => _Doctor.default, doctor => doctor.user, {
  cascade: true
}), _dec15 = (0, _typeorm.JoinColumn)(), _dec16 = (0, _classTransformer.Exclude)(), _dec17 = Reflect.metadata("design:type", typeof _Doctor.default === "undefined" ? Object : _Doctor.default), _dec18 = (0, _typeorm.OneToOne)(() => _Pacient.default, pacient => pacient.user, {
  cascade: true
}), _dec19 = (0, _classTransformer.Exclude)(), _dec20 = (0, _typeorm.JoinColumn)(), _dec21 = Reflect.metadata("design:type", typeof _Pacient.default === "undefined" ? Object : _Pacient.default), _dec22 = (0, _typeorm.OneToOne)(() => _Clinic.default, clinic => clinic.user, {
  cascade: true
}), _dec23 = (0, _typeorm.JoinColumn)(), _dec24 = Reflect.metadata("design:type", typeof _Clinic.default === "undefined" ? Object : _Clinic.default), _dec25 = (0, _typeorm.Column)({
  type: "varchar",
  nullable: true
}), _dec26 = Reflect.metadata("design:type", String), _dec27 = (0, _typeorm.CreateDateColumn)(), _dec28 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec29 = (0, _typeorm.UpdateDateColumn)(), _dec30 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec31 = (0, _classTransformer.Expose)({
  name: "avatar_url"
}), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = class User {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "name", _descriptor2, this);
    _initializerDefineProperty(this, "email", _descriptor3, this);
    _initializerDefineProperty(this, "password", _descriptor4, this);
    _initializerDefineProperty(this, "role", _descriptor5, this);
    _initializerDefineProperty(this, "doctor", _descriptor6, this);
    _initializerDefineProperty(this, "pacient", _descriptor7, this);
    _initializerDefineProperty(this, "clinic", _descriptor8, this);
    _initializerDefineProperty(this, "avatar", _descriptor9, this);
    _initializerDefineProperty(this, "created_at", _descriptor10, this);
    _initializerDefineProperty(this, "updated_at", _descriptor11, this);
  }
  getAvatarUrl() {
    if (!this.avatar) {
      return null;
    }
    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${_upload.default.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec8, _dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec11, _dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "doctor", [_dec14, _dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pacient", [_dec18, _dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "clinic", [_dec22, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "avatar", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getAvatarUrl", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "getAvatarUrl"), _class2.prototype)), _class2)) || _class);
var _default = User;
exports.default = _default;