import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DoctorsController from '../controllers/DoctorsController';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import ProfileDoctorController from '../controllers/ProfileDoctorController';

const doctorsRouter = Router();

const doctorsController = new DoctorsController();
const updateDoctorsController = new ProfileDoctorController();

doctorsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    doctorsController.create,
);

doctorsRouter.get(
    '/',
    authMiddleware,
    doctorsController.findAllDoctors,
);

doctorsRouter.put(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().required(),
            cep: Joi.string().required(),
            crm: Joi.string(),
        },
    }),
    updateDoctorsController.updateDoctor,
);

export default doctorsRouter;

