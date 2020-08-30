import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUserType1598803438500 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                columns: [
                    {
                        default: 'uuid_generate_v4()',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        name: 'id',
                        type: 'uuid',
                    },
                    {
                        isUnique: true,
                        name: 'slug',
                        type: 'varchar',
                    },
                    {
                        default: false,
                        name: 'admin',
                        type: 'boolean',
                    },
                    {
                        default: 'now()',
                        name: 'created_at',
                        type: 'timestamp',
                    },
                    {
                        default: 'now()',
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                ],
                name: 'user_types',
            }),
        );

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('user_types')
            .values([
                {
                    admin: true,
                    slug: 'teacher',
                },
                {
                    slug: 'student',
                },
                {
                    admin: true,
                    slug: 'tutor',
                },
                {
                    admin: true,
                    slug: 'admin',
                },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('user_types')
            .where([
                {
                    slug: 'teacher',
                },
                {
                    slug: 'student',
                },
                {
                    slug: 'tutor',
                },
                {
                    slug: 'admin',
                },
            ])
            .execute();
        await queryRunner.dropTable('user_types');
    }
}
