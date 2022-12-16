import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/user.controller';
//import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticate';

const usersRouters = Router();
//const upload = multer(uploadConfig.multer);
const usersController = new UsersController();

usersRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

export default usersRouters;
