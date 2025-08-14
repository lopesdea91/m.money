import { Request, Response } from "express";
import financeTypeRepository from "../repository/financeTypeRepository";

export const getFinanceTypes = async (req: Request, res: Response) => {
  const financeType = await financeTypeRepository.findAll();

  res.status(200).json(financeType);
};
