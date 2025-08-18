import { Request, Response } from "express";
import { User } from "../../entity/User";
import userService from "../Services/UserService";
import { QueryPagination } from "../utils";

const userControllers = {
  get: async (req: Request, res: Response) => {
    try {
      const { page, limit, ...query } = QueryPagination<User>(Object(req.query))

      if (!req.query.page) {
        let params = { ...query }
        const { items } = await userService.getAll(params)

        return (items.length === 0)
          ? res.status(204).json({})
          : res.status(200).json(items)
      }

      let params = { ...query, page, limit }
      const { items, currentPage, lastPages, perPage, total } = await userService.pagination(params)

      return (items.length === 0)
        ? res.status(204).json({})
        : res.status(200).json({
          items,
          currentPage,
          lastPages,
          perPage,
          total,
        })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getId: async (req: Request, res: Response) => {
    try {
      const { item } = await userService.getId(Number(req.params.id))

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const data = { ...req.body, active: 1, token: '' }

      if (!data || !data.name || !data.email) {
        throw Error("Name and email are required")
      }

      const { item } = await userService.create(data)

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const data = { ...req.body }

      if (!data || !data.name || !data.email) {
        throw Error("Name, and email are required")
      }

      const { item } = await userService.update(
        Number(req.params.id),
        data
      )

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await userService.delete(Number(req.params.id));

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
}
export default userControllers