import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import MessageController from '../controllers/MessageControllers';

const messagesRouter = Router();
const messageController = new MessageController();

messagesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            conversationId: Joi.string().required(),
            sender: Joi.string().required(),
            text: Joi.string().required(),
        },
    }),
    messageController.newMessage,
);

messagesRouter.get(
    '/:conversationId',
    celebrate({
        [Segments.PARAMS]: {
            conversationId: Joi.string().required(),
        },
    }),
    messageController.findMessage,
);

export default messagesRouter;
