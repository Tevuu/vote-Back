import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVotesColumnIntoVoteEntity1697883378040 implements MigrationInterface {
    name = 'AddVotesColumnIntoVoteEntity1697883378040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`votes\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`votes\``);
    }

}
