import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Exclude} from 'class-transformer';

import UserType from '@modules/user/infra/typeorm/entities/UserType';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    type_id: string;

    @ManyToOne(() => UserType)
    @JoinColumn({name: 'type_id'})
    type: UserType;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
