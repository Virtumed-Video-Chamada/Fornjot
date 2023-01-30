import ICreateConversationDTO from '../dtos/ICreateConversationDTO';
import ITwoConversationDTO from '../dtos/ITwoConversatiosDTO';
import Conversation from '../infra/typeorm/schemas/Conversation';

export default interface IConversationRepository {
    createConversation(data: ICreateConversationDTO): Promise<Conversation>;
    findConversation(user_id: string): Promise<Conversation[] | undefined>;
    findTwoConversation(data: ITwoConversationDTO): Promise<Conversation | null>;
    save(data: Conversation): Promise<Conversation>;
}
