import { Request, Response } from "express";
import { FinanceTag } from "../../entity/FinanceTag";
import financeTagService from "../Services/FinanceTagService";
import { QueryPagination } from "../utils";

const financeTagController = {
  get: async (req: Request, res: Response) => {
    try {
      const { page, limit, ...query } = QueryPagination<FinanceTag>(Object(req.query))

      if (!req.query.page) {
        let params = { ...query }
        const { items } = await financeTagService.getAll(params)

        return (items.length === 0)
          ? res.status(204).json({})
          : res.status(200).json(items)
      }

      let params = { ...query, page, limit }
      const { items, currentPage, lastPages, perPage, total } = await financeTagService.pagination(params)

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
      const { item } = await financeTagService.getId(Number(req.params.id))

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const data = { ...req.body, active: 1 }

      if (!data || !data.name || !data.typeId || !data.userId) {
        throw Error("Name, typeId, and userId are required")
      }

      const { item } = await financeTagService.create(data)

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const data = { ...req.body };

      if (!data || !data.name || !data.typeId || !data.active || !data.userId) {
        throw Error("Name, typeId, active, and userId are required")
      }

      const { item } = await financeTagService.update(
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
      await financeTagService.delete(Number(req.params.id));

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
}
export default financeTagController
