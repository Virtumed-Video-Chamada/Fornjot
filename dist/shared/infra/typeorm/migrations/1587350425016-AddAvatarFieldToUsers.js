"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
class AddAvatarFieldToUsers1587350425016 {
  async up(queryRunner) {
    queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true
    }));
  }
  async down(queryRunner) {
    queryRunner.dropColumn('users', 'avatar');
  }
}
exports.default = AddAvatarFieldToUsers1587350425016;