"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class FakeMailProvider {
  constructor() {
    this.messagens = [];
  }
  async sendMail(message) {
    this.messagens.push(message);
  }
}
exports.default = FakeMailProvider;