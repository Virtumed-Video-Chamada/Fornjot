import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
class Message {
    @ObjectIdColumn()
    id: ObjectID;

    @Column('timestamp')
    conversationId: string;

    @Column('timestamp')
    sender: string;

    @Column('timestamp')
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

// 38:19 minutos de video

export default Message;
