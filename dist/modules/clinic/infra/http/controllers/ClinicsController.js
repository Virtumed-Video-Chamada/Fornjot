"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _CreateClinicService = _interopRequireDefault(require("../../../services/create/CreateClinicService"));
var _ClinicService = _interopRequireDefault(require("../../../services/ClinicService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClinicsController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createUser = _tsyringe.container.resolve(_CreateClinicService.default);
    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
  async findAllClinics(request, response) {
    const findAllClinics = _tsyringe.container.resolve(_ClinicService.default);
    const allClinics = await findAllClinics.execute();
    return response.json((0, _classTransformer.instanceToInstance)(allClinics));
  }
}
exports.default = ClinicsController;