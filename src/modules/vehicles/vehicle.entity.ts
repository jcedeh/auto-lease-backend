import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { FuelType, VehicleStatus, TransmissionType, VehicleCategory } from "./vehicle.enums.js";




@Entity()
export class Vehicle {
@PrimaryGeneratedColumn("uuid")
id!: string;

@Column({
    type: "varchar",
    unique: true,
    length: 17
})
vin!: string;

@Column({
    type: "varchar",
    unique: true,
    length: 20
})
licensePlate!: string;

@Column({
    type: "varchar",
    length: 100
})
brand!: string;

@Column({
    type: "varchar",
    length: 100
})
model!: string;

@Column({
    type: "int",
})
year!: number;

@Column({
    type: "varchar",
    length: 50
})
color!: string;

@Column({
    type: "enum",
    enum: VehicleCategory
})
category!: VehicleCategory;

@Column({
    type: "enum",
    enum: TransmissionType
})
transmission!: TransmissionType;

@Column({
    type: "enum",
    enum: FuelType
})
fuelType!: FuelType;

@Column({
    type: "int",
})
seats!: number;

@Column({
    type: "decimal",
    precision: 10,
    scale: 2
})
pricePerDay!: number;

@Column({
    type: "text",
    nullable: true
})
description?: string;

@Column({
    type: "varchar",
    nullable: true
})
imageUrl?: string;

@Column({
    type: "enum",
    enum: VehicleStatus,
    default: VehicleStatus.AVAILABLE
})
status!: VehicleStatus;

@CreateDateColumn()
createdAt!: Date;

@UpdateDateColumn()
updatedAt!: Date;

}