import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667488433794 implements MigrationInterface {
    name = 'createTables1667488433794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_3aa2679641c78400626f378aeb6"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_161b1be2f954368d9ef56cabe0a"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "REL_5ecebd30b4f8d270d54375dee0"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "descriptionIdId"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "services" ADD "descriptionId" uuid`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "UQ_5ecebd30b4f8d270d54375dee0a" UNIQUE ("descriptionId")`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_034b52310c2d211bc979c3cc4e8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_5ecebd30b4f8d270d54375dee0a" FOREIGN KEY ("descriptionId") REFERENCES "description"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_5ecebd30b4f8d270d54375dee0a"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_034b52310c2d211bc979c3cc4e8"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "UQ_5ecebd30b4f8d270d54375dee0a"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "descriptionId"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "descriptionIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "REL_5ecebd30b4f8d270d54375dee0" UNIQUE ("descriptionIdId")`);
        await queryRunner.query(`ALTER TABLE "services" ADD "categoryIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_161b1be2f954368d9ef56cabe0a" FOREIGN KEY ("descriptionIdId") REFERENCES "description"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_3aa2679641c78400626f378aeb6" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
