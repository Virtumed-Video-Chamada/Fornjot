import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '@shared/infra/http/middlewares/auth.doctor';
import MedicalRecordController from '../controllers/MedicalRecordController';

const medicalRecord = Router();
const medicalRecordController = new MedicalRecordController();

medicalRecord.post(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            pacientId: Joi.string().required(),
            diagnosis: Joi.string().required(),
            observations: Joi.string().required(),
            date: Joi.date(),
        },
    }),
    medicalRecordController.create,
);


export default medicalRecord;
