import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";

import CreatePacientService from "@modules/users/services/create/CreatePacientService";

export default class PacientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreatePacientService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
