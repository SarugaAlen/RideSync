import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { syncDatabase } from './src/infrastructure/database/database';
import userRoutes from './src/presentation/routes/userRoutes';
import swaggerRoutes from './src/presentation/routes/swagger';


dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            destination: 1,
        },
    },
});


const pinoLogger = pinoHttp({
    logger,
});

app.use(pinoLogger);
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use(swaggerRoutes);

const startServer = async () => {
    try {
        await syncDatabase();
        app.listen(PORT, () => {
            console.log(`User service running on http://localhost:${PORT}/users`);
            console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error("Error syncing the database:", error);
    }
};

startServer();

export default app;
