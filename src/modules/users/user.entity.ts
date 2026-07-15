import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { UserRole } from "./user-role.enum.js";
import { Booking } from "../bookings/bookings.entity.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 100 })
  firstName!: string;

  @Column("varchar", { length: 100 })
  lastName!: string;

  @Column("varchar", { unique: true, length: 255 })
  email!: string;

  @Column("varchar", {select: true, length: 255 })
  password!: string;

  @Column("enum", {
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;

 @OneToMany(
    () => Booking,
    booking => booking.user
  )
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}