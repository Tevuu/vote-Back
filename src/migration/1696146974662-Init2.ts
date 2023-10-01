// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Init21696146974662 implements MigrationInterface {
//     name = 'Init21696146974662'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`grup\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` ADD \`grup\` text NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` ADD \`roles\` text NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`news\` ADD \`grup\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
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
//         await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
//         await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`grup\``);
//         await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roles\``);
//         await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`grup\``);
//         await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`grup\` \`description\` varchar(255) NOT NULL`);
//     }

// }
