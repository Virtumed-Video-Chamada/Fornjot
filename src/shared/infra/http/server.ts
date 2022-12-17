import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
//import rateLimiter from './middlewares/limiterRate';
import AppError from '@shared/errors/App.Error';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import routes from '../routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

//app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server Error',
    });
});

app.listen(3333, () => {
    console.log('🚀 Server Start on http://localhost:3333');
});
