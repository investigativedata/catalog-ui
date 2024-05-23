import filterOptions from "../filterOptions";

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export function capitalizeFirstLetter(str) {
  if (!str) return;

  const castStr = str.toString()

  return castStr.charAt(0).toUpperCase() + castStr.slice(1);
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

export function calculateCatalogStats(datasets) {
  return ({
    contentType: getOrderedFieldCounts(datasets, 'contentType'),
    countries:  getCountryCounts(datasets),
    frequency: getOrderedFieldCounts(datasets, 'frequency'),
    tags: getTags(datasets)
  })
}

export function applyActiveFilters(items, filters) {
  let filteredItems = items

  if (filters.contentType.length > 0) {
    filteredItems = filteredItems.filter(({ contentType }) => filters.contentType.includes(contentType))
  }
  if (filters.frequency.length > 0) {
    filteredItems = filteredItems.filter(({ frequency }) => filters.frequency.includes(frequency))
  }

  if (filters.tags.length > 0) {
    filteredItems = filteredItems.filter(({ tags }) => filters.tags.some(t => tags.includes(t)))
  }

  if (filters.countries.length > 0) {
    filteredItems = filteredItems.filter(({ countries }) => filters.countries.some(c => countries.find(({ code }) => code === c)))
  }

  return filteredItems
}