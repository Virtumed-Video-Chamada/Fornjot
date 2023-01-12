"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _CreateDoctorService = _interopRequireDefault(require("../../../services/create/CreateDoctorService"));
var _DoctorService = _interopRequireDefault(require("../../../services/DoctorService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DoctorsController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createUser = _tsyringe.container.resolve(_CreateDoctorService.default);
    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
  async findAllDoctors(request, response) {
    const findAllDoctors = _tsyringe.container.resolve(_DoctorService.default);
    const allDoctors = await findAllDoctors.execute();
    return response.json((0, _classTransformer.instanceToInstance)(allDoctors));
  }
}
exports.default = DoctorsController;