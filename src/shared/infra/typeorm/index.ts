import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const portMongoDB = process.env.DB_PORT_MONGO as number | undefined;
const portPostgres = process.env.DB_PORT_POSTGRES as number | undefined;

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: portPostgres,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/db/migrations/*.js'],
    extra: {
        cli: {
            migrationsDir: './dist/shared/infra/typeorm/migrations',
        },
    },
    synchronize: true,
    logging: false,
});

PostgresDataSource.initialize()
    .then(() => {
        console.log('PostgresDataSource has been initialized!');
    })
    .catch(err => {
        console.error('Error during PostgresDataSource initialization', err);
    });

export const MongoDataSource = new DataSource({
    name: "mongodb",
    type: 'mongodb',
    host: process.env.DB_HOST,
    //password: process.env.DB_PASS_MONGO,
    port: portMongoDB,
    database: process.env.DB_NAME,
    useUnifiedTopology: true,
    logging: false,
    entities: ['./dist/modules/**/infra/typeorm/schemas/*.js'],
});

MongoDataSource.initialize()
    .then(() => {
        console.log('MongoDataSource has been initialized!');
    })
    .catch(err => {
        console.error('Error during MongoDataSource initialization', err);
    });
