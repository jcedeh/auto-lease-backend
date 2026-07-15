import { UserRepository } from "../users/user.repository.js";
import { VehicleRepository } from "../vehicles/vehicle.repository.js";
import { BookingRepository } from "./booking.repository.js";
import { CreateBookingDto } from "./booking.dto.js";
import { AppError } from "../../errors/AppError.js";
import { HTTP_STATUS } from "../../constants/http-status.js";
import { VehicleStatus } from "../vehicles/vehicle.enums.js";
import { BookingStatus } from "./booking.enum.js";


export class BookingService {
    constructor(
        private bookingRepository: BookingRepository,
        private vehicleRepository: VehicleRepository,
        private userRepository: UserRepository
    ) {}

    async createBooking(
        userId: string,
        dto: CreateBookingDto
    ) {
        if (!userId) {
            throw new AppError(
                "Unauthorized",
                HTTP_STATUS.UNAUTHORIZED
            )
        }

        //find user
        const user = await this.userRepository.findById(userId)
        if(!user) {
            throw new AppError(
                "User not found",
                HTTP_STATUS.NOT_FOUND
            )
        }
        //find vehicle
        const vehicle = await this.vehicleRepository.findById(dto.vehicleId)
        if(!vehicle) {
            throw new AppError(
                "vehicle not found",
                HTTP_STATUS.NOT_FOUND
            )
        }
        //check availability
        if(vehicle.status !== VehicleStatus.AVAILABLE) {
            throw new AppError(
                "Vehicle not available",
                HTTP_STATUS.NOT_FOUND
            )
        }
        //convert string from dto to date
        const startDate = new Date(dto.startDate)
        const endDate = new Date(dto.endDate)
        const today = new Date()

        
        //inspection time before available booking
       function addHours(value: Date | string, hours: number): Date {
            const date = new Date(value);
            date.setHours(date.getHours() + hours);
            return date;
}
        const effectiveEndDate = addHours(endDate, 2);

        if(startDate < today) {
            throw new AppError(
                "Booking cannot start in the past",
                HTTP_STATUS.BAD_REQUEST
            )
        }

        if(effectiveEndDate < startDate) {
            throw new AppError(
                "End date must be after start date",
                HTTP_STATUS.BAD_REQUEST
            )
        }

        //check for overlapping
        const overlapping = await this.bookingRepository.findOverlappingBooking(
            vehicle.id,
            startDate,
            effectiveEndDate
        )
        if(overlapping) {
            throw new AppError(
                "Vehicle is already booked for the selected dates.",
                HTTP_STATUS.CONFLICT
            )
        }
        //calculate the number of rental days
        const duration = endDate.getTime() - startDate.getTime();
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const rentalDays = Math.ceil(duration / millisecondsPerDay);
        const totalPrice = rentalDays * vehicle.pricePerDay;

        //create and save booking
        const booking = await this.bookingRepository.createBooking(
            {
            startDate: startDate,
            endDate: endDate,
            status : BookingStatus.PENDING,
            totalPrice : totalPrice
    })
        return {userId, booking}
        }
        
    }
