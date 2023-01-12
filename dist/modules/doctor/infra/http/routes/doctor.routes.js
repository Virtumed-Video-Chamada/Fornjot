"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _DoctorsController = _interopRequireDefault(require("../controllers/DoctorsController"));
var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));
var _ProfileDoctorController = _interopRequireDefault(require("../controllers/ProfileDoctorController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const doctorsRouter = (0, _express.Router)();
const doctorsController = new _DoctorsController.default();
const updateDoctorsController = new _ProfileDoctorController.default();
doctorsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), doctorsController.create);
doctorsRouter.get('/', _auth.default, doctorsController.findAllDoctors);
doctorsRouter.put('/', _auth.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    cpf: _celebrate.Joi.string().required(),
    cep: _celebrate.Joi.string().required(),
    crm: _celebrate.Joi.string()
  }
}), updateDoctorsController.updateDoctor);
var _default = doctorsRouter;
exports.default = _default;