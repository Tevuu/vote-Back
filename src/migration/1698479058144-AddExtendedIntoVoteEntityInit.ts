import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExtendedIntoVoteEntityInit1698479058144 implements MigrationInterface {
    name = 'AddExtendedIntoVoteEntityInit1698479058144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`extended\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`extended\``);
    }

}
