import { delay, inject, injectable } from 'tsyringe';

import ConversationsRepository from '@modules/chat/infra/typeorm/repositories/ConversationRepository';
import Conversation from '@modules/chat/infra/typeorm/schemas/Conversation';
import IConversationRepository from '@modules/chat/repositories/IConversationRepository';

interface IRequest {
    senderId: string;
    receiverId: string;
}

@injectable()
class CreateConversationService {
    constructor(
        @inject('ConversationsRepository')
        private conversationsRepository: IConversationRepository,
    ) {}

    public async execute({
        senderId,
        receiverId,
    }: IRequest): Promise<Conversation> {
        const newConveration = await this.conversationsRepository.save({
            senderId,
            receiverId,
        });
        return newConveration;
    }
}

export default CreateConversationService;
