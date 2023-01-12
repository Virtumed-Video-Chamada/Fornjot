"use strict";

var _tsyringe = require("tsyringe");
var _RedisCacheProvider = _interopRequireDefault(require("./CacheProvider/implementations/RedisCacheProvider"));
require("./StorageProvider");
require("./MailTemplateProvider");
require("./MailProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_tsyringe.container.registerInstance("CacheProvider", _tsyringe.container.resolve(_RedisCacheProvider.default));