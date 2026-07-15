import type { Request, Response, NextFunction } from "express";
import { BookingService } from "./booking.service.js";

export class BookingController{
    constructor(
        private readonly bookingService : BookingService
    ){}

    createBooking = async(
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            
            const booking = await this.bookingService.createBooking(req.user.id, req.body)
            return res.status(201).json({
                success: true,
                data: booking,
                message: "booking created successfully"
            }
            )
        }
        catch (error) {
            next(error)
        }

        }
    }


