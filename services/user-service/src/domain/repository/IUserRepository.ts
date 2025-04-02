import User from '../models/User';

export interface IUserRepository {
    create(userData: { name: string; email: string; password: string; role: string }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(userId: number): Promise<void>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
}