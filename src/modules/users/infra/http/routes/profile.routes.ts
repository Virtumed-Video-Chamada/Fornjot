import { Router } from 'express';
//import { celebrate, Joi, Segments } from 'celebrate';

//import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ProfileController from '../controllers/user/profile.controller';

const profileRouter = Router();
const profileController = new ProfileController();

//profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

// profileRouter.put(
//     '/',
//     celebrate({
//         [Segments.BODY]: {
//             name: Joi.string().required(),
//             email: Joi.string().email().required(),
//             old_password: Joi.string(),
//             password: Joi.string(),
//             password_confirmation: Joi.string().valid(Joi.ref('password')),
//         },
//     }),
//     profileController.update,
// );


export default profileRouter;
