import { Request, Response } from "express";
import { FinanceOrder } from "../../entity/FinanceOrder";
import financeOrderService from "../Services/FinanceOrderService";
import { QueryPagination } from "../utils";

const financeOrderController = {
  get: async (req: Request, res: Response) => {
    try {
      const { page, limit, ...query } = QueryPagination<FinanceOrder>(Object(req.query))

      const tagIds = !!query?.tagIds ? Array.isArray(query?.tagIds) ? query?.tagIds : [query?.tagIds] : undefined

      if (!req.query.page) {
        let params = { ...query, tagIds }
        const { items } = await financeOrderService.getAll(params)

        return (items.length === 0)
          ? res.status(204).json({})
          : res.status(200).json(items)
      }

      let params = { ...query, tagIds, page, limit }
      const { items, currentPage, lastPages, perPage, total } = await financeOrderService.pagination(params)

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
      const { item } = await financeOrderService.getId(Number(req.params.id))

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const data = { ...req.body, active: 1 }

      if (!data || !data.value || !data.date || !data.month || !data.typeId || !data.tagIds || !data.userId) {
        throw Error("value, date, month, typeId, tagIds and userId are required")
      }

      const { item } = await financeOrderService.create(data)

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const data = { ...req.body, active: 1 };

      if (!data || !data.value || !data.date || !data.month || !data.typeId || !data.tagIds || !data.userId) {
        throw Error("value, date, month, typeId, tagIds and userId are required")
      }

      const { item } = await financeOrderService.update(
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
      await financeOrderService.delete(Number(req.params.id));

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default financeOrderController