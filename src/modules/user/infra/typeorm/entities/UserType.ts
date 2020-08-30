import {
    Entity,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_types')
class UserType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    slug: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserType;
