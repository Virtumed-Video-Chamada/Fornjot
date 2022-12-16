import { Router, Request, Response } from 'express';
import appointmentsRouter from './appointments.routes';
import doctorsRouter from '../../../routes/doctorsRouter';
import pacientsRouter from '../../../routes/pacientsRouter';
import clinicsRouter from '../../../routes/clinicsRouter';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World' });
});

routes.use('/appointments', appointmentsRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/clinics', clinicsRouter);
routes.use('/pacients', pacientsRouter);

export default routes;
