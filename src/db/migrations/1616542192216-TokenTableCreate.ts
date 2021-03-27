import {MigrationInterface, QueryRunner} from "typeorm";

export class TokenTableCreate1616542192216 implements MigrationInterface {
    name = 'TokenTableCreate1616542192216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "token" varchar(255) NOT NULL, "email" varchar(150) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
