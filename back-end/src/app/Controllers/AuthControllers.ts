import { Request, Response } from "express";
import userService from "../Services/UserService";


const authControllers = {
  signIn: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = (await userService.getEmail(email)).item

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // crete fake token
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);

    // save new token to user
    await userService.update(user.id, { ...user, token });

    // Implement sign-in logic here
    res.status(200).json({ token });
  },
  signOut: async (req: Request, res: Response) => {
    const [, token] = req.headers?.authorization?.split(' ') || [];

    const user = (await userService.getToken(token)).item

    // save new token to user
    await userService.update(user.id, { ...user, token: '' });

    // Implement sign-out logic here
    res.status(200).json({ message: "Sign-out successful" });
  },
  data: async (req: Request, res: Response) => {
    const [, token] = req.headers?.authorization?.split(' ') || [];

    const user = (await userService.getToken(token)).item

    const data = {
      "id": user.id,
      "name": user.name,
      "email": user.email,
    }
    res.status(200).json(data);
  },
}
export default authControllers
