import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init61696758734559 implements MigrationInterface {
  name = 'Init61696758734559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`profile_picture\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`profile_picture\``,
    );
  }
}
