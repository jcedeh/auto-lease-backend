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

getVehicles = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {

        const vehicles =
            await this.vehicleService.getVehicles();

        return res.json({
            success: true,
            data: vehicles
        });

    } catch (error) {
        next(error);
    }
};

getVehicleById = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {

        const vehicle =
            await this.vehicleService.getVehicleById(
                req.params.id
            );

        return res.json({
            success: true,
            data: vehicle
        });

    } catch (error) {
        next(error);
    }
};

updateVehicle = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
      const updatedVehicle =
        await this.vehicleService.updateVehicle(
            req.params.id,
            req.body
    );

      return res.json({
          success: true,
          data: updatedVehicle
      });
  }
      catch (error) {
      next(error);
    }
}

deleteVehicle = async (
    req: Request,
    res:  Response,
    next: NextFunction
) => {
    try {

        await this.vehicleService.deleteVehicle(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

}
