import { In } from "typeorm";
import { User } from "../../entity/User";
import financeOrderRepository from "../Repository/FinanceOrderRepository";
import financeOrderTagsRepository from "../Repository/FinanceOrderTagsRepository";
import financeTagRepository from "../Repository/FinanceTagRepository";
import userRepository from "../Repository/UserRepository";

const ResponseData = (user: User) => {
  return {
    "id": user.id,
    "name": user.name,
    "email": user.email,
    "active": user.active
  }
}

const userService = {
  pagination: async ({
    page: currentPage = 1,
    limit: perPage = 15,
    ...where
  }: Partial<User> & { page: number; limit: number }) => {
    const [items, total] = await userRepository.findAndCount({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      where: { ...where },
      order: { id: 'DESC', name: 'ASC' },
    })

    const lastPages = Math.ceil(total / perPage);

    return {
      items: items.map((user) => ResponseData(user)),
      currentPage,
      lastPages,
      perPage,
      total,
    }
  },
  getAll: async ({ ...where }: Partial<User> = {}) => {
    const items = await userRepository.find({ where })

    return {
      items: items.map((user) => ResponseData(user))
    }
  },
  getId: async (id: number) => {
    const user = await userRepository.findOneBy({ id });

    if (!user) throw new Error(`User (${id}) not found!`)

    const item = ResponseData(user)

    return { item }
  },
  getEmail: async (email: string) => {
    const user = await userRepository.findOneBy({ email });

    if (!user) throw new Error(`User (${email}) not found!`)

    const item = ResponseData(user)

    return { item }
  },
  getToken: async (token: string) => {
    const user = await userRepository.findOneBy({ token });

    if (!user) throw new Error(`User (${token}) not found!`)

    const item = ResponseData(user)

    return { item }
  },
  create: async (payload: {
    name: string
    email: string
    active: number
    token: string
  }) => {
    const data: any = {
      name: payload.name,
      email: payload.email,
      active: payload.active,
      token: payload.token,
    }

    const user = await userRepository.save(
      userRepository.create(data)
    ) as unknown as User

    const item = ResponseData(user)

    return { item }
  },
  update: async (
    id: number,
    payload: {
      name: string
      email: string
      active: number
      token: string
    }) => {
    if (!(await userRepository.findOneBy({ id })))
      throw new Error(`User (${id}) not found!`)

    await userRepository.update(id, payload)

    const user = await userRepository.findOneBy({ id });

    const item = ResponseData(user)

    return { item }
  },
  delete: async (userId: number) => {
    if (!(await userRepository.findOneBy({ id: userId })))
      throw new Error(`User (${userId}) not found!`)

    let tagsIds: number[] = []

    await financeTagRepository.find({ where: { userId } })
      .then(financeTags => {
        financeTags.forEach(financeTag => {
          tagsIds = [...new Set([...tagsIds, financeTag.id])]
          financeTagRepository.delete(financeTag.id)
        })
      })

    await financeOrderTagsRepository.find({ where: { tagId: In(tagsIds) } })
      .then((financeOrderTags) => {
        financeOrderTags.forEach(financeOrderTag => financeOrderTagsRepository.delete(financeOrderTag.id))
      })

    await financeOrderRepository.find({ where: { userId } })
      .then((financeOrders) => {
        financeOrders.forEach(financeOrder => financeOrderTagsRepository.delete(financeOrder.id))
      })


    await userRepository.delete(userId);
  },
}
export default userService