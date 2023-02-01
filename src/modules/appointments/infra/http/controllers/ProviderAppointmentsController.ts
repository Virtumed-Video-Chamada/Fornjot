import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.query;

        const listProviderAppointments = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
            day: Number(day),
        });

        return response.json(instanceToInstance(appointments));
    }

    public async clinicIndex(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.body;
        const { day, month, year } = request.query;

        const listProviderAppointments = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
            day: Number(day),
        });

        return response.json(instanceToInstance(appointments));
    }
}
