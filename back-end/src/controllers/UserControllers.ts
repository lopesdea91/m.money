import { Request, Response } from "express";
import { User } from "../entity/User";
import userRepository from "../repository/userRepository";
import { getQuery } from "../utils";


const ResponseUser = (user: User) => {
  return {
    "id": user.id,
    "name": user.name,
    "email": user.email,
    "isActive": user.isActive
  }
}

export const getUsers = async (req: Request, res: Response) => {
  const query = getQuery<User>(req.query)

  if (query?.page) {
    const { items, currentPage, lastPages, perPage, total } = await userRepository.findPagination(query);

    res.status(200).json({
      items: items.map((user) => ResponseUser(user)),
      currentPage,
      lastPages,
      perPage,
      total,
    })
    return
  }

  delete query.page;
  delete query.limit;

  const items = await userRepository.findAll(query);

  res.status(200).json(items.map((user) => ResponseUser(user)))
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.findById(Number(req.params.id));

  if (user) {
    res.json(ResponseUser(user));
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;

  if (!data || !data.name || !data.email) {
    return res.status(400).json({ message: "Name, email are required" });
  }

  const user = await userRepository.create(data);

  res.status(201).json(ResponseUser(user));
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data || !data.name || !data.email) {
      return res.status(400).json({ message: "Name, email are required" });
    }

    const user = await userRepository.update(Number(req.params.id), data);

    res.status(201).json(ResponseUser(user));

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userRepository.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};