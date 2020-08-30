import {
    Entity,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Exclude} from 'class-transformer';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
