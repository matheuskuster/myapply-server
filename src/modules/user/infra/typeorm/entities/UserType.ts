import {
    Entity,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import User from './User';

@Entity('user_types')
class UserType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    slug: string;

    @Column()
    admin: boolean;

    @OneToMany(() => User, (user) => user.id)
    users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserType;
