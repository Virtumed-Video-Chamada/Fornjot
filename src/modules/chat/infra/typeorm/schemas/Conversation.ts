import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity("conversations")
class Conversation {
    @ObjectIdColumn()
    id: ObjectID;

    @Column('timestamp')
    members: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Conversation;
