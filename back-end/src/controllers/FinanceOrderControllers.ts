import { Request, Response } from "express";
import { FinanceOrder } from "../entity/FinanceOrder";
import { FinanceOrderTags } from "../entity/FinanceOrderTags";
import { FinanceTag } from "../entity/FinanceTag";
import { FinanceType } from "../entity/FinanceType";
import { User } from "../entity/User";
import financeOrderRepository from "../repository/financeOrderRepository";
import financeOrderTagsRepository from "../repository/financeOrderTagsRepository";
import financeTagRepository from "../repository/financeTagRepository";
import financeTypeRepository from "../repository/financeTypeRepository";
import userRepository from "../repository/userRepository";
import { getQuery } from "../utils";

/** dependencies */
type Dependencies = {
  users: User[];
  types: FinanceType[];
  tags: FinanceTag[];
  orderTags: FinanceOrderTags[];
}
const getDependecies = async (): Promise<Dependencies> => {
  const users = await userRepository.findAll()
  const types = await financeTypeRepository.findAll()
  const tags = await financeTagRepository.findAll()
  const orderTags = await financeOrderTagsRepository.findAll()

  return { users, types, tags, orderTags }
}

/** desponse */
const ResponseData = (order: FinanceOrder, { users, types, tags, orderTags }: Dependencies) => {
  const user = users.filter(t => t.id === order.userId).map(({ id, name }) => ({ id, name }))[0]
  const type = types.filter(t => t.id === order.typeId).map(({ id, name }) => ({ id, name }))[0]

  const tagIds = orderTags.filter(t => t.orderId === order.id).map(({ tagId }) => tagId)
  const tags_ = tags.filter(t => tagIds.includes(t.id)).map(({ id, name }) => ({ id, name }))

  return {
    id: order.id,
    value: order.value,
    date: order.date,
    active: order.active,
    typeId: order.typeId,
    type,
    userId: order.userId,
    user,
    tagIds,
    tags: tags_
  }
}

export const getFinanceOrders = async (req: Request, res: Response) => {
  const dependecies = await getDependecies()

  const query = getQuery<FinanceOrder>(req.query)

  if (query?.page) {
    const { items, currentPage, lastPages, perPage, total } = await financeOrderRepository.findPagination(query);

    res.status(200).json({
      items: items.map((data) => ResponseData(data, dependecies)),
      currentPage,
      lastPages,
      perPage,
      total,
    })
    return
  }

  delete query.page;
  delete query.limit;

  const items = await financeOrderRepository.findAll(query);

  res.status(200).json(items.map((data) => ResponseData(data, dependecies)))
}

export const getFinanceOrderById = async (req: Request, res: Response) => {
  const dependecies = await getDependecies()

  const financeOrder = await financeOrderRepository.findById(Number(req.params.id))

  if (financeOrder) {
    res.json(ResponseData(financeOrder, dependecies));
  } else {
    res.status(404).json({ message: "FinanceTag not found" });
  }
}

export const createFinanceOrder = async (req: Request, res: Response) => {
  const data = { ...req.body, active: 1 }

  if (!data || !data.value || !data.date || !data.typeId || !data.tagIds || !data.userId) {
    return res.status(400).json({ message: "value, date, typeId, tagIds and userId are required" });
  }

  const { tagIds } = data

  const financeOrder = await financeOrderRepository.create(data);
  const orderId = financeOrder.id

  /** create tags */
  Array.from(tagIds as number[]).forEach(async tagId => {
    await financeOrderTagsRepository.create({ tagId, orderId })
  });

  const dependecies = await getDependecies()
  res.status(201).json(ResponseData(financeOrder, dependecies));
}

export const updateFinanceOrder = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, active: 1 };

    if (!data || !data.value || !data.date || !data.typeId || !data.userId) {
      return res.status(400).json({ message: "value, date, typeId, and userId are required" });
    }

    const { tagIds } = data

    const financeOrder = await financeOrderRepository.update(Number(req.params.id), data);
    const orderId = financeOrder.id

    /** delete tags */
    await financeOrderTagsRepository.findAll({ orderId })
      .then((tags) => {
        tags.forEach(async tag => await financeOrderTagsRepository.delete(tag.id))
      })

    /** create tags */
    Array.from(tagIds as number[]).forEach(async tagId => {
      await financeOrderTagsRepository.create({ tagId, orderId })
    });

    const dependecies = await getDependecies()
    res.status(201).json(ResponseData(financeOrder, dependecies));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const deleteFinanceOrder = async (req: Request, res: Response) => {
  try {
    await financeOrderRepository.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


