import type { Request, Response, NextFunction } from "express";  
import { VehicleService } from "./vehicle.service.js";

export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService
  ) {}

  createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicle =
      await this.vehicleService.createVehicle(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });

  } catch (error) {
    next(error);
  }
};
}