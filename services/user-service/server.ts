import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import { sequelize, syncDatabase } from './src/infrastructure/database/database';
import userRoutes from './src/presentation/routes/userRoutes';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);

const startServer = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log(`User service running on port ${PORT}`);
    });
};

startServer();

export default app;
