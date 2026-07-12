import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source.js";
import { Vehicle } from "./vehicle.entity.js";

export class VehicleRepository {
  private repository: Repository<Vehicle>;

  constructor() {
    this.repository = AppDataSource.getRepository(Vehicle);
  }

  async createVehicle(data: Partial<Vehicle>) {
  const vehicle = this.repository.create(data);

  return await this.repository.save(vehicle);
}

async findByVin(vin: string) {
  return await this.repository.findOne({
    where: { vin },
  });
}

async findByLicensePlate(licensePlate: string) {
  return await this.repository.findOne({
    where: { licensePlate },
  });
}

async findById(id: string) {
  return await this.repository.findOne({
    where: { id },
  });
}

async findAll() {
  return await this.repository.find();
}

async save(vehicle: Vehicle) {
  return await this.repository.save(vehicle);
}

async delete(vehicle: Vehicle) {
  return await this.repository.remove(vehicle);
}

}