import { injectable, inject } from 'tsyringe';
import IConversationRepository from '../repositories/IConversationRepository';
import User from '@modules/users/infra/typeorm/entities/User';

injectable()
class ConversationService {
    constructor(
        @inject('ConversationsRepository')
        private conversationResitory: IConversationRepository,
    ) {}

    public async execute(id: string): Promise<User[] | null | void> {
        const user = await this.conversationResitory.findConversation(id);

        return user;
    }
}

export default ConversationService;
