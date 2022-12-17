import { UserToken } from '@model/userToken.model';

export default interface IUserTokensRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
