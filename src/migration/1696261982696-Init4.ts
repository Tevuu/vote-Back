// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Init41696261982696 implements MigrationInterface {
//     name = 'Init41696261982696'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`news\` ADD \`photos\` text NULL`);
//         await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
//         await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`photos\``);
//     }

// }
