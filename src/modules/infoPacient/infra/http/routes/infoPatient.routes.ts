import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '@shared/infra/http/middlewares/auth.doctor';
import InfoPacientController from '../controllers/InfoPacientController';

const infoPacient = Router();
const infoPacientController = new InfoPacientController();

infoPacient.post(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().required(),
            age: Joi.string().required(),
            height: Joi.string().required(),
            gender: Joi.string().required(),
            weight: Joi.string().required(),
        },
    }),
    infoPacientController.create,
);


export default infoPacient;
