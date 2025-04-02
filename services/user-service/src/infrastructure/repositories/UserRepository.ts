import { IUserRepository } from '../../domain/repository/IUserRepository';
import User from '../../domain/models/User';

class UserRepository implements IUserRepository {
    async create(userData: { name: string; email: string; password: string, role: string }) {
        return await User.create(userData);
    }

    async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }

    async findById(id: number) {
        return await User.findByPk(id);
    }

    async findAll() {
        return await User.findAll();
    }

    async update(user: User) {
        await user.save();
        return user;
    }

    async delete(id: number) {
        await User.destroy({ where: { id } });
    }
}

export default new UserRepository();