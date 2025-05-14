import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import AuthService from "../../infrastructure/middleware/AuthService";

const userService = new UserService(UserRepository);

export class UserController {
  static async login(req: Request, res: Response) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      const { user, accessToken } = await userService.loginUser(
        email,
        password
      );

      const responseUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: accessToken,
      };

      res.status(200).json(responseUser);
    } catch (error: any) {
      console.log("tu je error", error);
      res.status(401).json({ error: error.message });
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (typeof refreshToken !== "string") {
        res
          .status(400)
          .json({ error: "Refresh token is required and must be a string" });
        return;
      }

      const decoded = AuthService.verifyRefreshToken(refreshToken);

      const newAccessToken = AuthService.generateAccessToken({
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      });

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(401).json({ error: message });
    }
  }

  static async register(req: Request, res: Response) {
    console.log("registering user");
    console.log(req.body);
    try {
      const { name, email, password } = req.body;
      const user = await userService.registerUser({
        name,
        email,
        password,
        role: "user",
      });

      const responseUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      res.status(201).json(responseUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updatedUser = await userService.updateUser(
        Number(userId),
        req.body
      );
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

      if (!user) {
        res.status(404).send();
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
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
