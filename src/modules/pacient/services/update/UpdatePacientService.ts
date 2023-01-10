import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IPacientRepository from "@modules/pacient/repositories/IPacientRepository";

interface IRequest {
  id: string;
  cep: string;
  cpf: string;
  crm: string;
}

@injectable()
class UpdatePacientService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IPacientRepository,
  ) {}

  public async execute({
    id,
    cep,
    cpf,
    crm,
  }: IRequest): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.");
    }

    user.doctor.cep = cep;
    user.doctor.cpf = cpf;
    user.doctor.crm = crm;

    await this.usersRepository.save(user);

    return user
  }
}

export default UpdatePacientService;
