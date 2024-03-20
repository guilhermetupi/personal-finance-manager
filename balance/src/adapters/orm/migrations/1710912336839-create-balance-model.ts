import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBalanceModel1710912336839 implements MigrationInterface {
    name = 'CreateBalanceModel1710912336839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "balance" ("user_id" uuid NOT NULL, "amount" numeric(5,2) NOT NULL DEFAULT '0', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_abf63b0d5bfa0266a50e5073954" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "balance"`);
    }

}
