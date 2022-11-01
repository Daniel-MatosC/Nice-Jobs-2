import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667316606271 implements MigrationInterface {
    name = 'createTables1667316606271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "description" ("id" uuid NOT NULL, "serviceDescription" character varying NOT NULL, "serviceValue" numeric(12,2) NOT NULL, "atuationArea" character varying NOT NULL, CONSTRAINT "PK_313ee7159517cb494d532ee5466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL, "serviceName" character varying NOT NULL, "serviceOwner" character varying NOT NULL, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "categoriesId" uuid, "descriptionId" uuid, CONSTRAINT "REL_5ecebd30b4f8d270d54375dee0" UNIQUE ("descriptionId"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL, "date" character varying NOT NULL, "hour" character varying NOT NULL, "userId" uuid, "servicesId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isPremium" boolean NOT NULL, "isActive" boolean NOT NULL, "isOffering" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_5f5dd09bf247047977755ae87d0" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_5ecebd30b4f8d270d54375dee0a" FOREIGN KEY ("descriptionId") REFERENCES "description"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_57f036e4bc927fba3c0a1f6f339" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_57f036e4bc927fba3c0a1f6f339"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_5ecebd30b4f8d270d54375dee0a"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_5f5dd09bf247047977755ae87d0"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "description"`);
    }

}
