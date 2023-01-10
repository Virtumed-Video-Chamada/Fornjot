import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";

import CreateClinicService from "@modules/clinic/services/create/CreateClinicService";
import ClinicService from "@modules/clinic/services/ClinicService";

export default class ClinicsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateClinicService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  public async findAllClinics(request: Request, response: Response): Promise<Response> {

    const findAllClinics = container.resolve(ClinicService);

    const allClinics = await findAllClinics.execute()

    return response.json(instanceToInstance(allClinics));
  }
}
