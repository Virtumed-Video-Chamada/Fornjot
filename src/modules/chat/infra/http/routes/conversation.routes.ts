import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ConversationsController from '../controllers/ConversationsController';

const conversationsRouter = Router();
const conversationsController = new ConversationsController();

conversationsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            senderId: Joi.string().required(),
            receiverId: Joi.string().required(),
        },
    }),
    conversationsController.create,
);

conversationsRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().required(),
        },
    }),
    conversationsController.findConversation,
);

// get conversations incluindo dois users_id

conversationsRouter.get(
    '/:firstUserId/:seconUserdId',
    celebrate({
        [Segments.PARAMS]: {
            firstUserId: Joi.string().required(),
            seconUserdId: Joi.string().required(),
        },
    }),
    conversationsController.findTwoConversation,
);

export default conversationsRouter;
