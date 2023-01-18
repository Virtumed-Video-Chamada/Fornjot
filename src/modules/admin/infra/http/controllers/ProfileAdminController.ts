import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import UpdateClinicService from '@modules/clinic/services/update/UpdateClinicService';

export default class ProfileAdiminController {
    public async updateClinic(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, razao, cnpj, cep, address, number, city, district, state } =
            request.body;

        const updateUser = container.resolve(UpdateClinicService);

        const user = await updateUser.execute({
            id,
            razao,
            cnpj,
            cep,
            address,
            number,
            city,
            district,
            state,
        });

        return response.json(instanceToInstance(user));
    }

    public async updatePacient(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, razao, cnpj, cep, address, number, city, district, state } =
            request.body;

        const updateUser = container.resolve(UpdateClinicService);

        const user = await updateUser.execute({
            id,
            razao,
            cnpj,
            cep,
            address,
            number,
            city,
            district,
            state,
        });

        return response.json(instanceToInstance(user));
    }

    public async updateDoctor(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, razao, cnpj, cep, address, number, city, district, state } =
            request.body;

        const updateUser = container.resolve(UpdateClinicService);

        const user = await updateUser.execute({
            id,
            razao,
            cnpj,
            cep,
            address,
            number,
            city,
            district,
            state,
        });

        return response.json(instanceToInstance(user));
    }
}
