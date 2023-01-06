import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
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
    user_id,
    cep,
    cpf,
    crm,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    user.doctor.cpf = cpf
    user.doctor.cep = cep
    user.doctor.crm = crm

    return this.usersRepository.save(user);
  }
}

export default UpdateDoctorService;
