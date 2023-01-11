import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IClinicRepository from "@modules/clinic/repositories/IClinicsRepository";

interface IRequest {
  id: string;
  cep: string;
  cpf: string;
  crm: string;
}

@injectable()
class UpdateClinicService {
  constructor(
    @inject("ClinicsRepository")
    private usersRepository: IClinicRepository,
  ) {}

  public async execute({
    id,
    cep,
    cpf,
    crm,
  }: IRequest): Promise<User | null> {
    const user = await this.usersRepository.updateClinic(id);

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

export default UpdateClinicService;
