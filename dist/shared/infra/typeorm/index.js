"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostgresDataSource = exports.MongoDataSource = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
require("reflect-metadata");
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const portMongoDB = process.env.DB_PORT_MONGO;
const portPostgres = process.env.DB_PORT_POSTGRES;
const PostgresDataSource = new _typeorm.DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: portPostgres,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/db/migrations/*.ts'],
  extra: {
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations'
    }
  },
  synchronize: true,
  logging: true
});
exports.PostgresDataSource = PostgresDataSource;
PostgresDataSource.initialize().then(() => {
  console.log('PostgresDataSource has been initialized!');
}).catch(err => {
  console.error('Error during PostgresDataSource initialization', err);
});
const MongoDataSource = new _typeorm.DataSource({
  name: 'mongodb',
  type: 'mongodb',
  host: process.env.DB_HOST,
  port: portMongoDB,
  database: 'virtumed-mongodb',
  useUnifiedTopology: true,
  entities: ['./src/modules/**/infra/typeorm/schemas/*.ts']
});
exports.MongoDataSource = MongoDataSource;
MongoDataSource.initialize().then(() => {
  console.log('MongoDataSource has been initialized!');
}).catch(err => {
  console.error('Error during MongoDataSource initialization', err);
});