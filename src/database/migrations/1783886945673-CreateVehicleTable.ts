import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicleTable1783886945673 implements MigrationInterface {
    name = 'CreateVehicleTable1783886945673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vehicle_category_enum" AS ENUM('SEDAN', 'SUV', 'HATCHBACK', 'TRUCK', 'VAN', 'COUPE')`);
        await queryRunner.query(`CREATE TYPE "public"."vehicle_transmission_enum" AS ENUM('MANUAL', 'AUTOMATIC')`);
        await queryRunner.query(`CREATE TYPE "public"."vehicle_fueltype_enum" AS ENUM('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID')`);
        await queryRunner.query(`CREATE TYPE "public"."vehicle_status_enum" AS ENUM('AVAILABLE', 'BOOKED', 'MAINTENANCE', 'OUT_OF_SERVICE')`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vin" character varying(17) NOT NULL, "licensePlate" character varying(20) NOT NULL, "brand" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" integer NOT NULL, "color" character varying(50) NOT NULL, "category" "public"."vehicle_category_enum" NOT NULL, "transmission" "public"."vehicle_transmission_enum" NOT NULL, "fuelType" "public"."vehicle_fueltype_enum" NOT NULL, "seats" integer NOT NULL, "pricePerDay" numeric(10,2) NOT NULL, "description" text, "imageUrl" character varying, "status" "public"."vehicle_status_enum" NOT NULL DEFAULT 'AVAILABLE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_960e864037056a9e38cb4277bdd" UNIQUE ("vin"), CONSTRAINT "UQ_a654a0355ae4c5ba31c5f6c8925" UNIQUE ("licensePlate"), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_fueltype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_transmission_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_category_enum"`);
    }

}
