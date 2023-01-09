import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import UpdatePacientService from '@modules/pacient/services/update/UpdatePacientService';

export default class ProfilePacietController {
    public async updatePacient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const { cep, cpf, crm } = request.body;

        const updateUser = container.resolve(UpdatePacientService);

        const user = await updateUser.execute({
            id,
            cep,
            cpf,
            crm,
        });

        return response.json(instanceToInstance(user));
    }
}
