import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClinicsController from '../controllers/ClinicsController';
import authMiddleware from "@auth/auth";
import ProfileClinicController from '../controllers/ProfileClinicController';

const clinicsRouter = Router();
const clinicsController = new ClinicsController();
const updateClinicsController = new ProfileClinicController();

clinicsRouter.post(
    '/clinic',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    clinicsController.create,
);

clinicsRouter.get(
    '/',
    authMiddleware,
    clinicsController.findAllClinics,
);

clinicsRouter.put(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().required(),
            cep: Joi.string().required(),
            crm: Joi.string(),
        },
    }),
    updateClinicsController.updateClinic,
);

export default clinicsRouter;

