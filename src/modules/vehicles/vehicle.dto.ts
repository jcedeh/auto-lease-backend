import {
  IsEmail,
  IsNotEmpty,
  MinLength,
} from "class-validator";

import {VehicleCategory,VehicleStatus, TransmissionType, FuelType} from "./vehicle.enums.js";

export class CreateVehicleDto { 

    @IsNotEmpty()
    vin!: string;

    @IsNotEmpty()
    licensePlate!: string;

    @IsNotEmpty()
    brand!: string;

    @IsNotEmpty()
    model!: string;

    @IsNotEmpty()
    year!: number;

    @IsNotEmpty()
    fuelType!: FuelType;

    @IsNotEmpty()
    transmission!: TransmissionType;

    @IsNotEmpty()
    pricePerDay!: number;

    @IsNotEmpty()
    seats!: number;

    @IsNotEmpty()
    category!: VehicleCategory;

    @IsNotEmpty()
    color!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    imageUrl!: string;

    @IsNotEmpty()
    status!: VehicleStatus;


  
}


