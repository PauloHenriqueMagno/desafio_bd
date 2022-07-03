import {MigrationInterface, QueryRunner} from "typeorm";

export class Customer1656792593145 implements MigrationInterface {
    name = 'Customer1656792593145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "postal_code" character varying NOT NULL, "address" character varying NOT NULL, "address_number" integer NOT NULL, "address_complement" character varying NOT NULL, "address_district" character varying NOT NULL, "address_state" character varying NOT NULL, CONSTRAINT "UQ_479ee8911543c94860214f5fc39" UNIQUE ("email"), CONSTRAINT "PK_c3220bb99cfda194990bc2975be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Customers"`);
    }

}
