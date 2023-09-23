import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class NewsInit1695470602428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'news',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'int',
            default: '(UNIX_TIMESTAMP())',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('news');
  }
}
