import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667483790530 implements MigrationInterface {
    name = 'createTables1667483790530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_5ecebd30b4f8d270d54375dee0a"`);
        await queryRunner.query(`ALTER TABLE "services" RENAME COLUMN "descriptionId" TO "descriptionIdId"`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPremium" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_161b1be2f954368d9ef56cabe0a" FOREIGN KEY ("descriptionIdId") REFERENCES "description"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_161b1be2f954368d9ef56cabe0a"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isPremium" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "services" RENAME COLUMN "descriptionIdId" TO "descriptionId"`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_5ecebd30b4f8d270d54375dee0a" FOREIGN KEY ("descriptionId") REFERENCES "description"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
