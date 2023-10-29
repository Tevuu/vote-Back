import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLikedPersonsIdIntoNewsInit1698514959275 implements MigrationInterface {
    name = 'AddLikedPersonsIdIntoNewsInit1698514959275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` ADD \`likedPersonsId\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`likedPersonsId\``);
    }

}
