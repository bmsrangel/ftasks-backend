import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseCreate1616467275521 implements MigrationInterface {
    name = 'DatabaseCreate1616467275521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(150) NOT NULL, "password" varchar(60) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "users_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "users_id" integer NOT NULL, CONSTRAINT "FK_cda44177299ed22dbad9674a21c" FOREIGN KEY ("users_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_todos"("id", "description", "completed", "users_id") SELECT "id", "description", "completed", "users_id" FROM "todos"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`ALTER TABLE "temporary_todos" RENAME TO "todos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME TO "temporary_todos"`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "users_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "todos"("id", "description", "completed", "users_id") SELECT "id", "description", "completed", "users_id" FROM "temporary_todos"`);
        await queryRunner.query(`DROP TABLE "temporary_todos"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
