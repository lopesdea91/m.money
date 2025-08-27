import { In } from "typeorm";
import { FinanceOrder } from "../../entity/FinanceOrder";
import { FinanceOrderTags } from "../../entity/FinanceOrderTags";
import { FinanceTag } from "../../entity/FinanceTag";
import { FinanceType } from "../../entity/FinanceType";
import { User } from "../../entity/User";
import financeOrderRepository from "../Repository/FinanceOrderRepository";
import financeOrderTagsRepository from "../Repository/FinanceOrderTagsRepository";
import financeTagService from "./FinanceTagService";
import financeTypeService from "./FinanceTypeService";
import userService from "./UserService";

/** dependencies */
type Dependencies = {
  users: User[];
  types: FinanceType[];
  tags: FinanceTag[];
  orderTags: FinanceOrderTags[];
}
const getDependecies = async (userId?: number): Promise<Dependencies> => {
  const users = (await userService.getAll()).items as User[]
  const types = (await financeTypeService.getAll()).items
  const tags = (await financeTagService.getAll({ userId })).items
  const orderTags = await financeOrderTagsRepository.find() ?? []

  return { users, types, tags, orderTags }
}
/** response */
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

const financeOrderService = {
  pagination: async ({
    page: currentPage = 1,
    limit: perPage = 15,
    tagIds = [],
    ...where
  }: Partial<FinanceOrder> & { page: number; limit: number; tagIds?: number[] }) => {
    if (!where.userId) {
      throw Error("userId are required")
    }

    let _where = undefined

    if (!!tagIds?.length) {
      const orderIds = (await financeOrderTagsRepository
        .find({ where: { tagId: In(tagIds) } }))
        .map((el) => el.orderId)

      _where = {
        id: In(orderIds)
      }
    }

    const [items, total] = await financeOrderRepository.findAndCount({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      where: { ...where, ..._where },
      order: {
        date: 'ASC',
        typeId: 'ASC'
      },

    })

    const lastPages = Math.ceil(total / perPage);

    const dependecies = await getDependecies(Number(where.userId))

    return {
      items: items.map((financeOrder) => ResponseData(financeOrder, dependecies)),
      currentPage,
      lastPages,
      perPage,
      total,
    }
  },
  getAll: async ({ tagIds, ...where }: Partial<FinanceOrder> & { tagIds?: number[] }) => {
    if (!where.userId) {
      throw Error("userId are required")
    }

    let _where = undefined

    if (!!tagIds?.length) {
      const orderIds = (await financeOrderTagsRepository
        .find({ where: { tagId: In(tagIds) } }))
        .map((el) => el.orderId)

      _where = {
        id: In(orderIds)
      }
    }

    const items = await financeOrderRepository.find({ where: { ...where, ..._where } }) ?? []

    const dependecies = await getDependecies(Number(where.userId))

    return {
      items: items.map((financeOrder) => ResponseData(financeOrder, dependecies))
    }
  },
  getId: async (id: number) => {
    const financeOrder = await financeOrderRepository.findOneBy({ id });

    if (!financeOrder) throw new Error(`FinanceOrder (${id}) not found!`)

    const dependecies = await getDependecies()

    const item = ResponseData(financeOrder, dependecies)

    return { item }
  },
  create: async (payload: {
    value: string
    date: string
    month: string
    typeId: number
    tagIds: number[]
    userId: number
  }) => {
    const { tagIds } = payload

    const financeOrder = await financeOrderRepository.save(
      financeOrderRepository.create({
        value: payload.value,
        date: payload.date,
        month: payload.month,
        typeId: payload.typeId,
        active: 1,
        userId: payload.userId,
      })
    )
    const orderId = financeOrder.id

    const promises = tagIds.map(tagId =>
      financeOrderTagsRepository.save(financeOrderTagsRepository.create({ tagId, orderId }))
    )
    await Promise.all(promises)

    const dependecies = await getDependecies(Number(payload.userId))

    const item = ResponseData(financeOrder, dependecies)

    return { item }
  },
  update: async (
    orderId: number,
    payload: {
      value: string
      date: string
      month: string
      typeId: number
      tagIds: number[]
      active: number
      userId: number
    }) => {
    if (!(await financeOrderRepository.findOneBy({ id: orderId })))
      throw new Error(`FinanceOrder (${orderId}) not found!`)

    const { tagIds } = payload

    await financeOrderRepository.update(orderId, {
      value: payload.value,
      date: payload.date,
      month: payload.month,
      typeId: payload.typeId,
      active: payload.active,
      userId: payload.userId,
    })

    /** delete orderTags */
    await financeOrderTagsRepository.find({ where: { orderId } })
      .then(async (orderTags) => {
        await Promise.all(
          orderTags.map((orderTag) => financeOrderTagsRepository.delete(orderTag.id))
        )
      })

    /** create orderTags */
    await Promise.all(
      tagIds.map(tagId => financeOrderTagsRepository.save(
        financeOrderTagsRepository.create({ tagId, orderId })
      ))
    )

    const financeOrder = await financeOrderRepository.findOneBy({ id: orderId });

    const dependecies = await getDependecies(Number(payload.userId))

    const item = ResponseData(financeOrder, dependecies)

    return { item }
  },
  delete: async (id: number) => {
    if (!(await financeOrderRepository.findOneBy({ id })))
      throw new Error(`FinanceOrder (${id}) not found!`)


    /** delete orderTags */
    await financeOrderTagsRepository.find({ where: { orderId: id } })
      .then(async (orderTags) => {
        await Promise.all(
          orderTags.map((orderTag) => financeOrderTagsRepository.delete(orderTag.id))
        )
      })

    await financeOrderRepository.delete({ id });
  },
}
export default financeOrderService