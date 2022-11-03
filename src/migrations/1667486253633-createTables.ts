import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667486253633 implements MigrationInterface {
    name = 'createTables1667486253633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" ADD "isDone" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "isDone"`);
    }

}
