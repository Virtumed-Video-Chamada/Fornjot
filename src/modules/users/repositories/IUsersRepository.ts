import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined |  null>;
  findByEmail(email: string): Promise<User | undefined | null>;
  createDoctor(data: ICreateUserDTO): Promise<User>;
  createClinic(data: ICreateUserDTO): Promise<User>;
  createPacient(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
