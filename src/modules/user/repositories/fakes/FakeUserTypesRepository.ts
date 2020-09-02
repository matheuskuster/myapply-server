import IUserTypesRepository from '@modules/user/repositories/IUserTypesRepository';

import UserType from '@modules/user/infra/typeorm/entities/UserType';

class UserTypesRepository implements IUserTypesRepository {
    private userTypes: UserType[] = [];

    constructor() {
        const userTypes = [
            {admin: false, slug: 'student'},
            {admin: true, slug: 'teacher'},
            {admin: true, slug: 'tutor'},
            {admin: true, slug: 'admin'},
        ];

        userTypes.forEach((userType, index) => {
            this.userTypes.push({
                ...userType,
                created_at: new Date(),
                id: String(index),
                updated_at: new Date(),
                users: [],
            });
        });
    }

    public async findById(id: string): Promise<UserType | undefined> {
        const foundUserType = this.userTypes.find(
            (userType) => userType.id === id,
        );

        return foundUserType;
    }

    public async findBySlug(slug: string): Promise<UserType | undefined> {
        const foundUserType = this.userTypes.find(
            (userType) => userType.slug === slug,
        );

        return foundUserType;
    }
}

export default UserTypesRepository;
