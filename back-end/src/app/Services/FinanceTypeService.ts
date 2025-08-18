import financeTypeRepository from "../Repository/FinanceTypeRepository"

const financeTypeService = {
  getAll: async () => {
    const items = await financeTypeRepository.find()

    return {
      items
    }
  },
  create: async (payload: {
    name: string
  }) => {
    const financeTag = await financeTypeRepository.save(
      financeTypeRepository.create(payload)
    )

    const item = financeTag

    return { item }
  },
}
export default financeTypeService