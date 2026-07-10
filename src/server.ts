import reflectMetadata from "reflect-metadata";
import app from "./app.js";
import { AppDataSource } from "./config/data-source.js";

const PORT = process.env.PORT || 3000;

//connect to the database
AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

