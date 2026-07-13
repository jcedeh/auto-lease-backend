import {
  IsNotEmpty,
  IsOptional,
    IsString,
    Length,
    IsNumber,
    IsPositive

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
    @IsPositive()
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

export class UpdateVehicleDto { 

    @IsOptional()
    @IsString()   
    vin?: string;

    @IsOptional()   
    @IsString()
    @Length(1, 20)
    licensePlate?: string;

    @IsOptional()
    @IsString()
    @Length(1, 20)   
    brand?: string;

    @IsOptional() 
    @IsString()
    @Length(1, 20)  
    model?: string;

    @IsOptional()
    @IsNumber()
    @Length(1, 4)   
    year?: number;

    @IsOptional()   
    fuelType?: FuelType;

    @IsOptional()   
    transmission?: TransmissionType;

    @IsOptional()
    @IsNumber() 
    @IsPositive()  
    pricePerDay?: number;

    @IsOptional()  
    @IsNumber() 
    seats?: number;

    @IsOptional()   
    category?: VehicleCategory;

    @IsOptional()  
    @IsString()
    @Length(1, 20) 
    color?: string;

    @IsOptional()  
    @IsString()
    @Length(1, 250) 
    description?: string;

    @IsOptional()   
    imageUrl?: string;

    @IsOptional()   
    status?: VehicleStatus;
  
}





