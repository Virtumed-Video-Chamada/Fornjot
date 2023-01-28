import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateMedicalRecordService from '@modules/medicalRecord/services/create/CreateMedicalRecordService';

export default class MedicalRecordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id
        const { pacientId, diagnosis,observations, date } =
            request.body;

        const medicalRecordUser = container.resolve(CreateMedicalRecordService);

        const data = await medicalRecordUser.execute({
            id,
            pacientId,
            diagnosis,
            observations,
            date,
        });

        return response.json(instanceToInstance(data));
    }

    public async findForPatient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id
        const { pacientId, diagnosis,observations, date } =
            request.body;

        const medicalRecordUser = container.resolve(CreateMedicalRecordService);

        const data = await medicalRecordUser.execute({
            id,
            pacientId,
            diagnosis,
            observations,
            date,
        });

        return response.json(instanceToInstance(data));
    }

    public async findForDoctor(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id
        const { pacientId, diagnosis,observations, date } =
            request.body;

        const medicalRecordUser = container.resolve(CreateMedicalRecordService);

        const data = await medicalRecordUser.execute({
            id,
            pacientId,
            diagnosis,
            observations,
            date,
        });

        return response.json(instanceToInstance(data));
    }
}
