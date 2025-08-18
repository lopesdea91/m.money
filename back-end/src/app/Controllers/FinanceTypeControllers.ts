import { Request, Response } from "express";
import financeTypeService from "../Services/FinanceTypeService";

const financeTypeControllers = {
  get: async (req: Request, res: Response) => {

    const { items } = await financeTypeService.getAll()

    return (items.length === 0)
      ? res.status(204).json({})
      : res.status(200).json(items)
  }
}
export default financeTypeControllers