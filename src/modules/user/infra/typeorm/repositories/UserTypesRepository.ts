import {getRepository, Repository} from 'typeorm';

import IUserTypesRepository from '@modules/user/repositories/IUserTypesRepository';

import UserType from '@modules/user/infra/typeorm/entities/UserType';

class UserTypesRepository implements IUserTypesRepository {
    private ormRepository: Repository<UserType>;

    constructor() {
        this.ormRepository = getRepository(UserType);
    }

    public async findById(id: string): Promise<UserType | undefined> {
        const type = await this.ormRepository.findOne(id);

        return type;
    }

    public async findBySlug(slug: string): Promise<UserType | undefined> {
        const type = await this.ormRepository.findOne({
            where: {slug},
        });

        return type;
    }
}

export default UserTypesRepository;
