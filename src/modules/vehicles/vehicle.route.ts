import { Router } from "express";
import { VehicleController } from "./vehicle.controller.js";
import { VehicleService } from "./vehicle.service.js";
import { VehicleRepository } from "./vehicle.repository.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import {validationMiddleware} from "../../middlewares/validate.middleware.js";
import {CreateVehicleDto, UpdateVehicleDto} from "./vehicle.dto.js";
import { UserRole } from "../users/user-role.enum.js";

const vehicleRepository = new VehicleRepository();
const vehicleService = new VehicleService(vehicleRepository);
const vehicleController = new VehicleController(vehicleService);

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize(UserRole.ADMIN),
  validationMiddleware(CreateVehicleDto),
  vehicleController.createVehicle
);

router.get(
    "/",
    vehicleController.getVehicles
);

router.get(
    "/:id",
    vehicleController.getVehicleById
);

router.patch(
    "/:id",
    authMiddleware,
    authorize(UserRole.ADMIN),
    validationMiddleware(UpdateVehicleDto),
    vehicleController.updateVehicle
);

router.delete(
    "/:id",
    authMiddleware,
    authorize(UserRole.ADMIN),
    vehicleController.deleteVehicle
);

export default router;