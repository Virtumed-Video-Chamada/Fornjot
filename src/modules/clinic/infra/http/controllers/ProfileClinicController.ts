import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import UpdateClinicService from '@modules/clinic/services/update/UpdateClinicService';

export default class ProfileClinicController {
    public async updateClinic(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const { cep, cpf, crm } = request.body;

        const updateUser = container.resolve(UpdateClinicService);

        const user = await updateUser.execute({
            id,
            cep,
            cpf,
            crm,
        });

        return response.json(instanceToInstance(user));
    }
}
