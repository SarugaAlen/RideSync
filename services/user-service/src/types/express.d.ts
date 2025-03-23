import { Router } from 'express';
import { IUserRepository } from '../domain/repository/IUserRepository';

declare module 'express-serve-static-core' {
    interface Router {
        setRepository(repository: IUserRepository): void;
    }
}
