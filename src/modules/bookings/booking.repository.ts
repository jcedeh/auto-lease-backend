import { Booking } from "./bookings.entity.js";
import { AppDataSource } from "../../config/data-source.js";
import { BookingStatus } from "./booking.enum.js";



export class BookingRepository{
    private repository = AppDataSource.getRepository(Booking)

    async createBooking(data: Partial<Booking>) {
        const booking = this.repository.create(data)
        return await this.repository.save(booking)
    }

    async findOverlappingBooking(
    vehicleId: string,
    startDate: Date,
    endDate: Date
    ) {
    return this.repository
        .createQueryBuilder("booking")
        .where(
            "booking.vehicleId = :vehicleId",
            { vehicleId }
        )
        .andWhere(
            "booking.status != :status",
            {
                status: BookingStatus.CANCELLED,
            }
        )
        .andWhere(`
            NOT (
                :endDate <= "booking"."startDate"
                OR
                :startDate >= "booking"."endDate"
            )
        `, {
            startDate,
            endDate,
        })
        .getOne();
}
       
    }

