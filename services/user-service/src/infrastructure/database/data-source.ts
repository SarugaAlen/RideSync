import "reflect-metadata";
import { DataSource } from "typeorm";
import  User  from "../../domain/models/User"; // Adjust the path if needed

export const testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:", // In-memory DB (no file, resets on restart)
    entities: [User], // Add all your entities here
    synchronize: true, // Auto sync schema
    logging: false, // No logs in tests
});
