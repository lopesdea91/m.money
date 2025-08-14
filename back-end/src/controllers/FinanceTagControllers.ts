import { Request, Response } from "express";
import { FinanceTag } from "../entity/FinanceTag";
import { FinanceType } from "../entity/FinanceType";
import { User } from "../entity/User";
import financeTagRepository from "../repository/financeTagRepository";
import financeTypeRepository from "../repository/financeTypeRepository";
import userRepository from "../repository/userRepository";
import { getQuery } from "../utils";

/** dependencies */
type Dependencies = {
  users: User[];
  types: FinanceType[];
}
const getDependecies = async (): Promise<Dependencies> => {
  const users = await userRepository.findAll()
  const types = await financeTypeRepository.findAll()

  return { users, types }
}
/** desponse */
const ResponseData = (tag: FinanceTag, { types, users }: { types: FinanceType[], users: User[] }) => {
  const type = types.filter(t => t.id === tag.typeId).map(({ id, name }) => ({ id, name }))[0]
  const user = users.filter(t => t.id === tag.userId).map(({ id, name }) => ({ id, name }))[0]
  return { ...tag, type, user }
}

export const getFinanceTags = async (req: Request, res: Response) => {
  const dependecies = await getDependecies()

  const query = getQuery<FinanceTag>(req.query)

  if (query?.page) {
    const { items, currentPage, lastPages, perPage, total } = await financeTagRepository.findPagination(query);

    res.status(200).json({
      items: items.map((tag) => ResponseData(tag, dependecies)),
      currentPage,
      lastPages,
      perPage,
      total,
    })
    return
  }

  delete query.page;
  delete query.limit;

  const items = await financeTagRepository.findAll(query);

  res.status(200).json(items.map((tag) => ResponseData(tag, dependecies)))
};

export const getFinanceTagById = async (req: Request, res: Response) => {
  const dependecies = await getDependecies()

  const financeTag = await financeTagRepository.findById(Number(req.params.id))

  if (financeTag) {
    res.json(ResponseData(financeTag, dependecies));
  } else {
    res.status(404).json({ message: "FinanceTag not found" });
  }
};

export const createFinanceTag = async (req: Request, res: Response) => {
  const dependecies = await getDependecies()

  const data = req.body;

  if (!data || !data.name || !data.typeId || !data.userId) {
    return res.status(400).json({ message: "Name, typeId, and userId are required" });
  }

  const financeTag = await financeTagRepository.create(data);

  res.status(201).json(ResponseData(financeTag, dependecies));
};

export const updateFinanceTag = async (req: Request, res: Response) => {
  try {
    const dependecies = await getDependecies()

    const data = req.body;

    if (!data || !data.name || !data.typeId || !data.userId) {
      return res.status(400).json({ message: "Name, typeId, and userId are required" });
    }

    const financeTag = await financeTagRepository.update(Number(req.params.id), data);

    res.status(201).json(ResponseData(financeTag, dependecies));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteFinanceTag = async (req: Request, res: Response) => {
  try {
    await financeTagRepository.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};