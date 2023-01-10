import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IHashProvider from "../../../users/providers/HashProvider/models/IHashProvider";
import IPacientRepository from "@modules/pacient/repositories/IPacientRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreatePacientService {
  constructor(
    @inject("PacientsRepository")
    private usersRepository: IPacientRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError("E-mail already exists");
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const userExist = await this.usersRepository.createPacient({
      name,
      email,
      password: passwordHash,
    });

    await this.cacheProvider.invalidatePrefix("providers-list");

    return userExist;
  }
}

export default CreatePacientService;
