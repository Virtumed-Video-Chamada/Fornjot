import ICreateConversationDTO from '@modules/chat/dtos/ICreateConversationDTO';
import Conversation from '@modules/chat/infra/typeorm/schemas/Conversation';
import IConversationRepository from '@modules/chat/repositories/IConversationRepository';
import { MongoDataSource } from '@shared/infra/typeorm';
import { And, In, Repository } from 'typeorm';

class ConversationsRepository implements IConversationRepository {
    private ormRepository: Repository<Conversation>;

    constructor() {
        this.ormRepository = MongoDataSource.getMongoRepository(Conversation);
    }

    public async save(data: ICreateConversationDTO): Promise<Conversation> {
        const newConversation = this.ormRepository.create({
            members: [data.senderId, data.receiverId],
        });

        await this.ormRepository.save(newConversation);

        return newConversation;
    }

    public async findConversation(
        user_id: string,
    ): Promise<Conversation[] | undefined> {
        const conversation = await this.ormRepository.find({
            where: {
                members: In([user_id]),
            },
        });
        return conversation;
    }

    public async findTwoConversation(
        firstUserId: string,
        secondUserId: string,
    ): Promise<Conversation | null> {
        const conversation = await this.ormRepository.findOne({
            where: {
                members: In([firstUserId, secondUserId]),
            },
        });
        return conversation;
        // console.log(JSON.stringify(conversation))
    }
}

export default ConversationsRepository;
