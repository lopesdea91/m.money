import { getStore } from "@/@store"

export const formatValue = (value: number) => {
  return `R$ ${value.toFixed(2)}`
}
export const formatDate = (date: string) => {
  return date.split('-').reverse().join('/')
}
export const formatTagsIds = (tagIds: number[]) => {
  if (!tagIds.length) {
    return ''
  }

  const { listFinanceTags } = getStore()

  const findName = ((tagId: number) => listFinanceTags.find((tag) => tag.id === tagId)?.name)

  const tagNames = tagIds.map(findName).join(" / ");

  return `[ ${tagNames} ]`
}
export const filterTagByTypeId = (typeId: string) => {
  const { listFinanceTags } = getStore()

  return listFinanceTags.filter((tag) => tag.typeId === Number(typeId));
}
