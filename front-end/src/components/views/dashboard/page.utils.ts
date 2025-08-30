import type { ChartPieType, FinanceOrder, SumTagValue, SumTypeValue } from "@/types";


const renderSumTypesCards = (items: FinanceOrder[]): SumTypeValue[] => {
  const sumTypesCards: SumTypeValue[] = [
    { label: 'Receita', value: 0, slug: 'receita' },
    { label: 'Despesa', value: 0, slug: 'despesa' },
    { label: 'Disponível', value: 0, slug: 'disponivel' },
  ]
  items.forEach(item => {
    if (item.typeId === 1) {
      sumTypesCards[0].value += item.value
    }
    if (item.typeId === 2) {
      sumTypesCards[1].value += item.value
    }
    sumTypesCards[2].value = sumTypesCards[0].value - sumTypesCards[1].value
  })

  return sumTypesCards
}
const renderSumTags = (items: FinanceOrder[]): SumTagValue[] => {
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

  return sumTags
}
const renderSumTypesChartRevenues = (items: FinanceOrder[]): ChartPieType[] => {
  return items
    .filter(e => e.typeId === 1)
    .map(item => ({
      ...item,
      tagNames: item.tags.map(tag => tag.name).join(', ')
    }))
    .reduce((acc: ChartPieType[], item) => {
      const hasItem = acc.find(el => el.name === item.tagNames)

      if (hasItem) {
        acc = [...acc].map(el => {
          if (el.name === item.tagNames) {
            el.y = el.y + item.value
          }
          return el
        })

      } else {
        acc.push({
          name: item.tagNames,
          y: item.value
        })
      }
      return acc
    }, [] as ChartPieType[])
}
const renderSumTypesChartExpenses = (items: FinanceOrder[]) => {
  return items
    .filter(e => e.typeId === 2)
    .map(item => ({
      ...item,
      tagNames: item.tags.map(tag => tag.name).join(', ')
    }))
    .reduce((acc: ChartPieType[], item) => {
      const hasItem = acc.find(el => el.name === item.tagNames)

      if (hasItem) {
        acc = [...acc].map(el => {
          if (el.name === item.tagNames) {
            el.y = el.y + item.value
          }
          return el
        })

      } else {
        acc.push({
          name: item.tagNames,
          y: item.value
        })
      }
      return acc
    }, [] as ChartPieType[])
}

export const renderData = (items: FinanceOrder[]) => {
  return {
    sumTypesCards: renderSumTypesCards(items),
    sumTags: renderSumTags(items),
    chartRevenues: renderSumTypesChartRevenues(items),
    chartExpenses: renderSumTypesChartExpenses(items),
  }
}