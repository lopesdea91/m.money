import { FinanceTag } from "../../entity/FinanceTag";
import { FinanceType } from "../../entity/FinanceType";
import { User } from "../../entity/User";
import financeTagRepository from "../Repository/FinanceTagRepository";
import financeTypeService from "./FinanceTypeService";
import userService from "./UserService";

/** dependencies */
type Dependencies = {
  users: User[];
  types: FinanceType[];
}
const getDependecies = async (): Promise<Dependencies> => {
  const users = (await userService.getAll()).items as User[]
  const types = (await financeTypeService.getAll()).items

  return { users, types }
}
/** desponse */
const ResponseData = (tag: FinanceTag, { types, users }: { types: FinanceType[], users: User[] }) => {
  const type = types.filter(t => t.id === tag.typeId).map(({ id, name }) => ({ id, name }))[0]
  const user = users.filter(t => t.id === tag.userId).map(({ id, name }) => ({ id, name }))[0]
  return { ...tag, type, user }
}

const financeTagService = {
  pagination: async ({
    page: currentPage = 1,
    limit: perPage = 15,
    tagIds = [],
    ...where
  }: Partial<FinanceTag> & { page: number; limit: number; tagIds?: number[] }) => {
    if (!where.userId) {
      throw Error("userId are required")
    }

    const [items, total] = await financeTagRepository.findAndCount({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      where: { ...where },
      order: { id: 'DESC', typeId: 'ASC' },
    })

    const lastPages = Math.ceil(total / perPage);

    const dependecies = await getDependecies()

    return {
      items: items.map((financeOrder) => ResponseData(financeOrder, dependecies)),
      currentPage,
      lastPages,
      perPage,
      total,
    }
  },
  getAll: async ({ ...where }: Partial<FinanceTag>) => {
    if (!where.userId) {
      throw Error("userId are required")
    }

    const items = await financeTagRepository.find({ where })

    const dependecies = await getDependecies()

    return {
      items: items.map((financeOrder) => ResponseData(financeOrder, dependecies))
    }
  },
  getId: async (id: number) => {
    const financeTag = await financeTagRepository.findOneBy({ id });

    if (!financeTag) throw new Error(`financeTag (${id}) not found!`)

    const dependecies = await getDependecies()

    const item = ResponseData(financeTag, dependecies)

    return { item }
  },
  create: async (payload: {
    name: string
    typeId: number
    active: number
    userId: number
  }) => {
    const financeTag = await financeTagRepository.save(
      financeTagRepository.create(payload)
    )

    const dependecies = await getDependecies()

    const item = ResponseData(financeTag, dependecies)

    return { item }
  },
  update: async (
    id: number,
    payload: {
      name: string
      typeId: number
      active: number
      userId: number
    }) => {
    if (!(await financeTagRepository.findOneBy({ id })))
      throw new Error(`FinanceTag (${id}) not found!`)

    await financeTagRepository.update(id, payload)

    const financeTag = await financeTagRepository.findOneBy({ id });

    const dependecies = await getDependecies()

    const item = ResponseData(financeTag, dependecies)

    return { item }
  },
  delete: async (id: number) => {
    if (!(await financeTagRepository.findOneBy({ id })))
      throw new Error(`FinanceTag (${id}) not found!`)

    await financeTagRepository.delete({ id });
  },
}
export default financeTagService