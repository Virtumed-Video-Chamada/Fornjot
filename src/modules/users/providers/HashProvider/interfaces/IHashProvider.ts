export default interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(
        payload: string | undefined,
        hashed: string | undefined,
    ): Promise<boolean>;
}
