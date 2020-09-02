import UserType from '@modules/user/infra/typeorm/entities/UserType';

export default interface IUserTypesRepository {
    findById(id: string): Promise<UserType | undefined>;
    findBySlug(slug: string): Promise<UserType | undefined>;
}
