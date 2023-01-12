"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _UpdateDoctorService = _interopRequireDefault(require("../../../services/update/UpdateDoctorService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProfileDoctorController {
  async updateDoctor(request, response) {
    const id = request.user.id;
    const {
      cep,
      cpf,
      crm
    } = request.body;
    const updateUser = _tsyringe.container.resolve(_UpdateDoctorService.default);
    const user = await updateUser.execute({
      id,
      cep,
      cpf,
      crm
    });
    return response.json((0, _classTransformer.instanceToInstance)(user));
  }
}
exports.default = ProfileDoctorController;