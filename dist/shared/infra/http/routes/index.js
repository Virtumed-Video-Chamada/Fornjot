"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));
var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));
var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));
var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));
var _appointments = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/appointments.routes"));
var _providers = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providers.routes"));
var _doctor = _interopRequireDefault(require("../../../../modules/doctor/infra/http/routes/doctor.routes"));
var _pacient = _interopRequireDefault(require("../../../../modules/pacient/infra/http/routes/pacient.routes"));
var _clinic = _interopRequireDefault(require("../../../../modules/clinic/infra/http/routes/clinic.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.get("/", (req, res) => {
  res.json("Wellcome to vitumed-aplication");
});
routes.use("/clinic", _clinic.default);
routes.use("/pacient", _pacient.default);
routes.use("/doctors", _doctor.default);
routes.use("/sessions", _sessions.default);
routes.use("/users", _users.default);
routes.use("/password", _password.default);
routes.use("/profile", _profile.default);
routes.use("/appointments", _appointments.default);
routes.use("/providers", _providers.default);
var _default = routes;
exports.default = _default;