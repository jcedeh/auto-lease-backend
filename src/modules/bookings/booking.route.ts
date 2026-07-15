import express from "express";
import { BookingRepository } from "./booking.repository.js";
import { BookingService } from "./booking.service.js";
import {BookingController} from "./booking.controller.js";
import { UserRepository } from "../users/user.repository.js";
import { VehicleRepository } from "../vehicles/vehicle.repository.js";
import {authMiddleware} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/authorize.middleware.js"
import {validationMiddleware} from "../../middlewares/validate.middleware.js";
import { UserRole } from "../users/user-role.enum.js";
import { CreateBookingDto } from "./booking.dto.js";

const router = express.Router()

const userRepository = new UserRepository();
const vehicleRepository = new VehicleRepository();
const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository, 
                                         vehicleRepository, userRepository)
const bookingController = new BookingController(bookingService);


router.post("/", validationMiddleware(CreateBookingDto), 
                    authMiddleware, 
                    //authorize(UserRole.OWNER), 
                    bookingController.createBooking
)

export default router;