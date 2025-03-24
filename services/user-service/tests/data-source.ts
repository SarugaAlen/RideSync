import "reflect-metadata";
import { DataSource } from "typeorm";
import  User  from "../src/domain/models/User"; 

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    logging: true, 
    entities: [User],
});

export default AppDataSource;
