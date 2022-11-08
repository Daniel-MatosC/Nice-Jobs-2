import { MigrationInterface, QueryRunner } from "typeorm";

export class relationServicebyUser1667654968188 implements MigrationInterface {
    name = 'relationServicebyUser1667654968188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_3905389899d96c4f1b3619f68d5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_3905389899d96c4f1b3619f68d5"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "userId"`);
    }

}
