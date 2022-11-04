import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667595113289 implements MigrationInterface {
    name = 'createTables1667595113289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" ADD "isDone" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPremium" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPremium" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "isDone"`);
    }

}
