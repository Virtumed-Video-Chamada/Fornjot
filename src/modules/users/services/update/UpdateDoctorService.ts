import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
  cep: string;
  cpf: string;
  crm: string;
}

@injectable()
class UpdateDoctorService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    cep,
    cpf,
    crm,
  }: IRequest): Promise<User | null> {
    const user = await this.usersRepository.findDoctors(id);

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
