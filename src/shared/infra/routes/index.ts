import { Router, Request, Response } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World' });
});

routes.use('/appointments', appointmentsRouter);

export default routes;
