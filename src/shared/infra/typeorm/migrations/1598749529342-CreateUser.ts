import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUser1598749529342 implements MigrationInterface {
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
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'surname',
                        type: 'varchar',
                    },
                    {
                        isUnique: true,
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
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
                name: 'users',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
