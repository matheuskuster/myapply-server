import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class AddTypeIdFieldToUsers1598815414482 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                isNullable: true,
                isUnique: false,
                name: 'type_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['type_id'],
                name: 'UserType',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                referencedColumnNames: ['id'],
                referencedTableName: 'user_types',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'UserType');
        await queryRunner.dropColumn('users', 'type_id');
    }
}
