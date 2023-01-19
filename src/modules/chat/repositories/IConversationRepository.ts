import ICreateDoctorDTO from '@modules/doctor/dtos/ICreateDoctorDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateConversationDTO from '../dtos/ICreateConversationDTO';
import Conversation from '../infra/typeorm/schemas/Conversation';

export default interface IConversationRepository {
    save(data: ICreateConversationDTO): Promise<Conversation>;
    findConversation(id: string): Promise<User[] | null | void>;
}
