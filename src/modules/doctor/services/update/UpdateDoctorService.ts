import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IDoctorRepository from "@modules/doctor/repositories/IDoctorRepository";

interface IRequest {
  id: string;
  cep: string;
  cpf: string;
  crm: string;
}

@injectable()
class UpdateDoctorService {
  constructor(
    @inject("DoctorsRepository")
    private usersRepository: IDoctorRepository,
  ) {}

  public async execute({
    id,
    cep,
    cpf,
    crm,
  }: IRequest): Promise<User | null> {
    const user = await this.usersRepository.updateDoctor(id);

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

export default UpdateDoctorService;
