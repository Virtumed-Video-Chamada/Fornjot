"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _CreatePacientService = _interopRequireDefault(require("../../../services/create/CreatePacientService"));
var _PacientService = _interopRequireDefault(require("../../../services/PacientService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PacientsController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createUser = _tsyringe.container.resolve(_CreatePacientService.default);
    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
  async findAllPacients(request, response) {
    const findAllPacients = _tsyringe.container.resolve(_PacientService.default);
    const allClinics = await findAllPacients.execute();
    return response.json((0, _classTransformer.instanceToInstance)(allClinics));
  }
}
exports.default = PacientsController;