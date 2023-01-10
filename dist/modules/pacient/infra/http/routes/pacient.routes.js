"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _PacientsController = _interopRequireDefault(require("../controllers/PacientsController"));
var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));
var _ProfilePacientController = _interopRequireDefault(require("../controllers/ProfilePacientController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const pacientRouter = (0, _express.Router)();
const pacientsController = new _PacientsController.default();
const updatePacientsController = new _ProfilePacientController.default();
pacientRouter.post('/pacient', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), pacientsController.create);
pacientRouter.get('/', _auth.default, pacientsController.findAllPacients);
pacientRouter.put('/', _auth.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    cpf: _celebrate.Joi.string().required(),
    cep: _celebrate.Joi.string().required(),
    crm: _celebrate.Joi.string()
  }
}), updatePacientsController.updatePacient);
var _default = pacientRouter;
exports.default = _default;