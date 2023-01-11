import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PacientsController from '../controllers/PacientsController';

import authMiddleware from '@auth/auth';
import ProfilePacientController from '../controllers/ProfilePacientController';

const pacientRouter = Router();
const pacientsController = new PacientsController();
const updatePacientsController = new ProfilePacientController();

pacientRouter.post(
    '/pacient',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    pacientsController.create,
);

pacientRouter.get(
    '/',
    authMiddleware,
    pacientsController.findAllPacients,
);

pacientRouter.put(
    '/',
    authMiddleware,
    celebrate({
        [Segments.BODY]: {
            cpf: Joi.string().required(),
            cep: Joi.string().required(),
            crm: Joi.string(),
        },
    }),
    updatePacientsController.updatePacient,
);

export default pacientRouter;
