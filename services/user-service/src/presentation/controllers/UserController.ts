import { Request, Response } from 'express';
import { UserService } from '../../application/services/UserService';
import UserRepository from '../../infrastructure/repositories/UserRepository';

const userService = new UserService(UserRepository);

export class UserController {

    static async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await userService.registerUser({ name, email, password });
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const updatedUser = await userService.updateUser(Number(userId), req.body);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            await userService.deleteUser(Number(userId));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await userService.findUserById(Number(userId));
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.findAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const user = await userService.findUserByEmail(email);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    
}