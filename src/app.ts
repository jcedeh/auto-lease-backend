import express from "express";
import "reflect-metadata";
import userRoutes from "./modules/users/user.routes.js"
import {errorMiddleware} from "./middlewares/error.middleware.js"
import authRoutes from "./modules/auth/auth.route.js"

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(userRoutes);



app.use(errorMiddleware);
export default app;