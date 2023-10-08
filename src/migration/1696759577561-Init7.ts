import { MigrationInterface, QueryRunner } from "typeorm";

export class Init71696759577561 implements MigrationInterface {
    name = 'Init71696759577561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` ADD \`photos\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`photos\``);
    }

}
