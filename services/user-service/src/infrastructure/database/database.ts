import { Sequelize } from "sequelize";
import User from "../../domain/models/User";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing the database:", error);
    }
};

export { sequelize, syncDatabase };
