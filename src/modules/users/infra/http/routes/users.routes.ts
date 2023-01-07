import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import DoctorsController from '../controllers/DoctorsController';
import PacientsController from '../controllers/PacientsController';
import ClinicsController from '../controllers/ClinicsController';

import UserAvatarController from '../controllers/UserAvatarController';

import authMiddleware from '../middlewares/auth';

const usersRouter = Router();
const doctorsController = new DoctorsController();
const pacientsController = new PacientsController();
const clinicsController = new ClinicsController();

const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
    '/doctor',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    doctorsController.create,
);

usersRouter.post(
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

usersRouter.post(
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

usersRouter.patch(
    '/avatar',
    authMiddleware,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
