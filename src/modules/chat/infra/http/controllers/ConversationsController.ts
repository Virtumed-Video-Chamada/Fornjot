import ConversationService from '@modules/chat/service/ConversationService';
import CreateConversationService from '@modules/chat/service/create/CreateConversationService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ConversationsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { senderId, receiverId } = request.body;

        const newConveration = container.resolve(CreateConversationService);

        const conversation = await newConveration.execute({
            senderId,
            receiverId,
        });

        return response.json(instanceToInstance(conversation));
    }

    public async findConversation(
        request: Request,
        response: Response,
    ): Promise<Response> {

        const { id } = request.params;

        const findConversation = container.resolve(ConversationService);

        const conversation = await findConversation.execute(id);

        return response.json(instanceToInstance(conversation));
    }
}
