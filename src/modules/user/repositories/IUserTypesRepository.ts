import UserType from '@modules/user/infra/typeorm/entities/UserType';

export default interface IUserTypesRepository {
    findBySlug(slug: string): Promise<UserType | undefined>;
}
