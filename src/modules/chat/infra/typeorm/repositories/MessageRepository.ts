import IMessageRepository from '@modules/chat/repositories/IMessageRepository';
import Message from '../schemas/Message';
import { Repository } from 'typeorm';
import { MongoDataSource } from '@shared/infra/typeorm';
import ICreateMessageDTO from '@modules/chat/dtos/ICreateMessageDTO';

class MessageRepository implements IMessageRepository {
    private ormRepository: Repository<Message>;
    constructor() {
        this.ormRepository = MongoDataSource.getMongoRepository(Message);
    }

    public async addMessage(data: ICreateMessageDTO): Promise<Message> {
        const newMessage = this.ormRepository.create({
            conversationId: data.conversationId,
            sender: data.sender,
            text: data.text,
        });

        const message = await this.ormRepository.save(newMessage);

        return message;
    }

    public async findMessage(conversationId: string): Promise<Message[]> {
        const message = this.ormRepository.find({
            where: {
                conversationId,
            },
        });

        return message;
    }
}

export default MessageRepository;
