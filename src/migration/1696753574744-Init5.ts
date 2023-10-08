// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Init51696753574744 implements MigrationInterface {
//     name = 'Init51696753574744'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profile_picture\` \`profile_picture\` varchar(255) NULL`);
//         await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP())`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`news\` CHANGE \`createdAt\` \`createdAt\` int NOT NULL DEFAULT 'unix_timestamp()'`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profile_picture\` \`profile_picture\` varchar(255) NOT NULL`);
//     }

// }
