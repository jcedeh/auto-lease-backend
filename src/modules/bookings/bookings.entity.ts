import "reflect-metadata";
import
    {Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column}
from "typeorm"
import { User } from "../users/user.entity.js";
import { Vehicle } from "../vehicles/vehicle.entity.js";
import { BookingStatus } from "./booking.enum.js";

@Entity("bookings")
export class Booking {
    @PrimaryGeneratedColumn("uuid")
    id!: string
    @ManyToOne(
    () => User,
    user => user.bookings
            )
            @JoinColumn({
                name: "userId"
            })
    user!: User;

    @ManyToOne(
    () => Vehicle,
    vehicle => vehicle.booking
            )
    @JoinColumn({
    name: "vehicleId"
            })
    vehicle!: Vehicle;

    @Column({
        type: "date"
    })
    startDate!: Date

    @Column({
        type: "date"
    })
    endDate!: Date

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    totalPrice!: number

    @Column({
    type: "enum",
    enum: BookingStatus,
    default: BookingStatus.PENDING
    })
    status!: BookingStatus;

    @CreateDateColumn()
    createdAt!: Date 

    @UpdateDateColumn()
    updatedAt!: Date
}


