import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserAvatarController from '../controllers/UserAvatarController';

import authMiddleware from '@shared/infra/http/middlewares/auth';

const usersRouter = Router();

const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.patch(
    '/avatar',
    authMiddleware,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
