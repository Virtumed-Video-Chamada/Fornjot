"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _upload = _interopRequireDefault(require("../../../../../config/upload"));
var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));
var _auth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersRouter = (0, _express.Router)();
const userAvatarController = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default.multer);
usersRouter.patch('/avatar', _auth.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;