import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { authByHeaders } from "../middleware/auth";

const userRepository = AppDataSource.getRepository(User);

export const authSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // crete fake token
  const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);

  // save new token to user
  await userRepository.save({ ...user, token });

  // Implement sign-in logic here
  res.status(200).json({ token });
}

export const authSignOut = async (req: Request, res: Response) => {
  // Implement sign-out logic here
  res.status(200).json({ message: "Sign-out successful" });
}

export const authData = async (req: Request, res: Response) => {
  const user = await authByHeaders(req.headers)

  const data = {
    "id": user.id,
    "name": user.name,
    "email": user.email,
  }
  res.status(200).json(data);
}
