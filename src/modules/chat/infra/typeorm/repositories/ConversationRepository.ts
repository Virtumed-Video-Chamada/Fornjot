import ICreateConversationDTO from '@modules/chat/dtos/ICreateConversationDTO';
import Conversation from '@modules/chat/infra/typeorm/schemas/Conversation';
import IConversationRepository from '@modules/chat/repositories/IConversationRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { MongoDataSource, PostgresDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

class ConversationsRepository implements IConversationRepository {
    private ormRepository: Repository<Conversation>;
    private userOrmRepository: Repository<User>;

    constructor() {
        this.ormRepository = MongoDataSource.getMongoRepository(Conversation);
        this.userOrmRepository = PostgresDataSource.getRepository(User);
    }

    public async save(data: ICreateConversationDTO): Promise<Conversation> {
        const newConversation = this.ormRepository.create({
            members: [data.senderId, data.receiverId],
        });

        await this.ormRepository.save(newConversation);

        return newConversation;
    }

    public async findConversation(id: string): Promise<User[] | null | void> {
        const user = this.userOrmRepository.find({
            where: { id },
        });
        return user;
    }

    // public async findIncludeTwoUsers(
    //     id: string,
    //     secondId: string,
    // ): Promise<User[] | undefined> {
    //     const firstUser = this.userOrmRepository.findOne({
    //         where: { id },
    //     });

    //     return user;
    // }
}

export default ConversationsRepository;
