"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _ClinicsController = _interopRequireDefault(require("../controllers/ClinicsController"));
var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));
var _ProfileClinicController = _interopRequireDefault(require("../controllers/ProfileClinicController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clinicsRouter = (0, _express.Router)();
const clinicsController = new _ClinicsController.default();
const updateClinicsController = new _ProfileClinicController.default();
clinicsRouter.post('/clinic', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), clinicsController.create);
clinicsRouter.get('/', _auth.default, clinicsController.findAllClinics);
clinicsRouter.put('/', _auth.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    cpf: _celebrate.Joi.string().required(),
    cep: _celebrate.Joi.string().required(),
    crm: _celebrate.Joi.string()
  }
}), updateClinicsController.updateClinic);
var _default = clinicsRouter;
exports.default = _default;