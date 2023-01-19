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

conversationsRouter.get('/:id', conversationsController.findConversation);

export default conversationsRouter;
