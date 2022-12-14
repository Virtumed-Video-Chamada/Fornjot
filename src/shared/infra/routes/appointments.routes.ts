import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';
import AppointmentRepositories from '../../../repositories/appointments.repositorie';

// [X] POST http://localhost:3333/appointments

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepositories();

appointmentsRouter.get('/', (req, res) => {
    const appointment = appointmentRepository.findAll();

    return res.json(appointment);
});

appointmentsRouter.post('/', (req, res) => {
    const { provider, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate =
        appointmentRepository.findByDate(parsedDate);

    if (findAppointmentInSameDate) {
        return res
            .status(400)
            .json({ message: 'Este horário já está marcado' });
    }
    const appointment = appointmentRepository.createAppointment(
        provider,
        parsedDate,
    );

    return res.json(appointment);
});

export default appointmentsRouter;
