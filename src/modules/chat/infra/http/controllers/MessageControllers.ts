import CreateMessageService from '@modules/chat/service/create/CreateMessageService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class MessageController {
    public async newMessage(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { conversationId, sender, text } = request.body;

        const addMessage = container.resolve(CreateMessageService);

        const message = await addMessage.execute({
            conversationId,
            sender,
            text,
        });

        return response.json(instanceToInstance(message));
    }
}
