import { VehicleRepository } from "./vehicle.repository.js";
import {CreateVehicleDto, UpdateVehicleDto} from "./vehicle.dto.js"; 
import { AppError } from "../../errors/AppError.js";
import { HTTP_STATUS } from "../../constants/http-status.js";


export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository
  ) {}

  async createVehicle(dto: CreateVehicleDto) {

    const existingVehicleByVin = await this.vehicleRepository.findByVin(dto.vin);
    if (existingVehicleByVin) {
      throw new AppError("Vehicle with this VIN already exists", HTTP_STATUS.BAD_REQUEST);
    }

    const existingVehicleByLicensePlate = await this.vehicleRepository.findByLicensePlate(dto.licensePlate);
    if (existingVehicleByLicensePlate) {
      throw new AppError("Vehicle with this license plate already exists", HTTP_STATUS.BAD_REQUEST);
    }
    
    const currentYear = new Date().getFullYear();

            if (
            dto.year < 1900 ||
            dto.year > currentYear + 1
            ) {
            throw new AppError(
                "Invalid vehicle year",
                HTTP_STATUS.BAD_REQUEST
            );
            }
    
    if (dto.pricePerDay <= 0) {
      throw new AppError("Price per day must be greater than 0", HTTP_STATUS.BAD_REQUEST);
    }

    if (dto.seats <= 0) {
      throw new AppError("Seats must be greater than 0", HTTP_STATUS.BAD_REQUEST);
    }

    const newVehicle = await this.vehicleRepository.createVehicle({
        vin: dto.vin,
        licensePlate: dto.licensePlate,
        brand: dto.brand,
        model: dto.model,
        year: dto.year,
        color: dto.color,
        seats: dto.seats,
        category: dto.category,
        transmission: dto.transmission,
        fuelType: dto.fuelType,
        pricePerDay: dto.pricePerDay,
        description: dto.description,
        imageUrl: dto.imageUrl,
        status: dto.status
    });

    return newVehicle;

  }

  async getVehicles() {
    return await this.vehicleRepository.findAll();
}

async getVehicleById(id: string) {
    const vehicle =
        await this.vehicleRepository.findById(id);

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return vehicle;
}

async updateVehicle(id: string, dto: Partial<UpdateVehicleDto>) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
        throw new AppError(
            "Vehicle not found",
            HTTP_STATUS.NOT_FOUND
        );
    } 

    if (dto.vin && dto.vin !== vehicle.vin) {
      const existing =
          await this.vehicleRepository.findByVin(dto.vin);

      if (existing) {
          throw new AppError(
              "VIN already exists",
              HTTP_STATUS.BAD_REQUEST
          );
      }
    }

    if (dto.licensePlate && dto.licensePlate !== vehicle.licensePlate) {
      const existing =
          await this.vehicleRepository.findByLicensePlate(dto.licensePlate);
      if (existing) {
          throw new AppError(
              "License plate already exists",
              HTTP_STATUS.BAD_REQUEST
          );
    }
}
  Object.assign(vehicle, dto); 

}

async deleteVehicle(id: string) {
    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    await this.vehicleRepository.delete(vehicle);

}

}