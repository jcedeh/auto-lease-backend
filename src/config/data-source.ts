import "reflect-metadata";
import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,

  logging: true,

  entities: [path.join(process.cwd(), "src/modules/**/*.entity.ts")],

  migrations: [path.join(process.cwd(), "src/database/migrations/*.{ts,js}")],
});