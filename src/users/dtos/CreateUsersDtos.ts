export default interface CreateUserDto {
    name: string;
    email: string;
    avatar: string;
    password: string;
    confirmPassword?: string;
}
