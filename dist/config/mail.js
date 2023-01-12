"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'humberto.araripe12@gmail.com',
      name: 'Humberto Henrique'
    }
  }
};
exports.default = _default;