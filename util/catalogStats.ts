import filterOptions from "./filterOptions";

export type TFilterValueCount = {
  value: string,
  label?: string,
  count: number
}

export type TFilterValueCounts = {
  contentType: TFilterValueCount[],
  countries:  TFilterValueCount[],
  frequency: TFilterValueCount[],
  tags: TFilterValueCount[]
}

const getFieldCounts = (items, field) => (
  items.reduce((acc, item) => ({...acc, [item[field]]:(acc[item[field]] || 0) + 1}),{})
)

const getOrderedFieldCounts = (items, field) => {
  const order = filterOptions.find(filterGroup => filterGroup.field === field)?.options

  const counts = getFieldCounts(items, field)

  return order.map(value => ({ value, count: counts[value] || 0 }))
}

const getCountryCounts = (items) => {
  const flattenedCountries = items
    .map(({ countries }) => countries)
    .flat()
  
  const countLookup = flattenedCountries.reduce((acc, item) => ({
    ...acc,
    [item.code]:{ label: item.label, count:(acc[item.code]?.count || 0) + 1 }
  }),{})

  return Object.entries(countLookup)
    .map(([value, { label, count }]) => ({ value, label, count }))
    .sort((a, b) => a.count < b.count ? 1 : -1)
}

const getTags = (items) => {
  const tagsRaw = items
    .map(({ tags }) => tags)
    .flat()
  
  return [...new Set(tagsRaw)]
}

export default function calculateCatalogStats(datasets) {
  return ({
    contentType: getOrderedFieldCounts(datasets, 'contentType'),
    countries:  getCountryCounts(datasets),
    frequency: getOrderedFieldCounts(datasets, 'frequency'),
    tags: getTags(datasets)
  })
}