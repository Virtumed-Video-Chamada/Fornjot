import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateInfoPacientService from '@modules/infoPacient/services/create/CreateInfoPacientService';

export default class InfoPacientController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, age, gender, height, weight } = request.body;

        const infoPacientUser = container.resolve(CreateInfoPacientService);

        const data = await infoPacientUser.execute({
            id,
            age,
            gender,
            height,
            weight,
        });

        return response.json(instanceToInstance(data));
    }
}
