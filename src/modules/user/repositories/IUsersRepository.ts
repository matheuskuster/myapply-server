import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUser from '@modules/user/dtos/ICreateUserDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUser): Promise<User>;
    save(user: User): Promise<User>;
}
