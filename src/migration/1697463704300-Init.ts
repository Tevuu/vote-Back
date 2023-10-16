import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697463704300 implements MigrationInterface {
    name = 'Init1697463704300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`secondName\` varchar(255) NOT NULL, \`thirdName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`bio\` varchar(255) NULL, \`grup\` text NOT NULL, \`roles\` text NOT NULL, \`profile_picture\` varchar(255) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`grup\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`header\` varchar(255) NOT NULL, \`content\` varchar(2000) NOT NULL, \`grup\` varchar(4) NOT NULL, \`photos\` text NULL, \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP()), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vote\` (\`id\` int NOT NULL AUTO_INCREMENT, \`header\` varchar(255) NOT NULL, \`elected\` text NOT NULL, \`votedPersonsId\` text NULL, \`voteCount\` int NOT NULL DEFAULT '0', \`grup\` varchar(255) NOT NULL, \`endedAt\` varchar(255) NOT NULL, \`createdAt\` int NOT NULL DEFAULT (UNIX_TIMESTAMP()), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`vote\``);
        await queryRunner.query(`DROP TABLE \`news\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
