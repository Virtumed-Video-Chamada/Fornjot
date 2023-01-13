import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FavoriteDoctorsController from '../controller/FavoriteDoctorsControllers';

const favoriteDoctorsRouter = Router();
const favoriteDoctorsController = new FavoriteDoctorsController();

favoriteDoctorsRouter.post(
    '/favoriteDoctors',
    celebrate({
        [Segments.BODY]: {
            pacient_id: Joi.string().required(),
            doctor_id: Joi.string().email().required(),
            data: Joi.string().required(),
        },
    }), // favoriteDoctorsController.create(), ERROR ( DEEP<PARTIAL> )
);
