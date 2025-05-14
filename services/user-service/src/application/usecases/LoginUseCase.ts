import { IUserRepository } from "../../domain/repository/IUserRepository";
import bcrypt from "bcryptjs";
import User from "../../domain/models/User";
import AuthService from "../../infrastructure/middleware/AuthService";

export class LoginUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = AuthService.generateAccessToken(payload);
    const refreshToken = AuthService.generateRefreshToken(payload);

    return { user, accessToken, refreshToken };
  }
}
