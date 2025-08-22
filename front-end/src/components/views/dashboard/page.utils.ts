import type { FinanceOrder, SumTagValue, SumTypeValue } from "@/types";

export const renderData = (items: FinanceOrder[]) => {
  const sumTypes: SumTypeValue[] = [
    { label: 'Receita', value: 0, slug: 'receita' },
    { label: 'Despesa', value: 0, slug: 'despesa' },
    { label: 'Disponível', value: 0, slug: 'disponivel' },
  ]
  items.forEach(item => {
    if (item.typeId === 1) {
      sumTypes[0].value += item.value
    }
    if (item.typeId === 2) {
      sumTypes[1].value += item.value
    }
    sumTypes[2].value = sumTypes[0].value - sumTypes[1].value
  })


  const sumTags: SumTagValue[] = []

  Object.values(items
    .map(item => ({
      ...item,
      tagNames: item.tags.map(tag => tag.name).join(', ')
    }))
    .reduce((acc, item) => {
      if (!acc?.[item.tagNames]) {
        acc = {
          ...acc,
          [item.tagNames]: {
            key: item.tagNames,
            value: 0,
            typeId: item.typeId,
            tags: item.tags,
            tagIds: item.tagIds,
          }
        }
      }

      acc[item.tagNames].value = +(Number(acc[item.tagNames].value + item.value).toFixed(2))

      return acc
    }, {} as Record<string, SumTagValue>))
    .sort((itemA, itemB) => itemA.key.localeCompare(itemB.key))
    .forEach(item => sumTags.push(item))


  return { sumTypes, sumTags }
}