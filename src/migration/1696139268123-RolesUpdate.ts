// import { MigrationInterface, QueryRunner } from "typeorm";

// export class RolesUpdate1696139268123 implements MigrationInterface {
//     name = 'RolesUpdate1696139268123'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`grup\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`news\` ADD \`grup\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`grup\``);
//         await queryRunner.query(`ALTER TABLE \`roles\` ADD \`grup\` varchar(255) NULL`);
//         await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`createdAt\``);
//         await queryRunner.query(`ALTER TABLE \`news\` ADD \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`createdAt\``);
//         await queryRunner.query(`ALTER TABLE \`news\` ADD \`createdAt\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`grup\``);
//         await queryRunner.query(`ALTER TABLE \`roles\` ADD \`grup\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`grup\``);
//         await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`grup\` \`description\` varchar(255) NOT NULL`);
//     }

// }
