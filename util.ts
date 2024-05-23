import { ICatalog, IDataset, ISchemataStats } from "@investigativedata/ftmq";
import filterOptions from "./filterOptions";

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


export function transformFTMCatalog(catalog: ICatalog) {
  return catalog.datasets?.map(transformFTMDataset)
}

export function transformFTMDataset(dataset: IDataset) {
  const { 
    category,
    content_type,
    coverage,
    entity_count,
    maintainer,
    name,
    publisher,
    summary,
    tags,
    title,
    updated_at
  } = dataset;

  const things = dataset.things as ISchemataStats
  const intervals = dataset.intervals as ISchemataStats

  const schemataMerged = [...(things?.schemata || []), ...(intervals?.schemata || [])]
    .sort((a, b) => a.count > b.count ? -1 : 1);

  const countries = [...(things?.countries || []), ...(intervals?.countries || [])]

  const countriesMerged = Object.values(
      countries.reduce((acc, item) => {
        acc[item.code] = acc[item.code]
          ? { ...item, count: item.count + acc[item.code].count }
          : item;
        return acc;
      }, {})
    )
    .sort((a, b) => a.count > b.count ? -1 : 1);
  
  console.log('tags', dataset)
  
  return ({
    category: category || "Other",
    contentType: content_type || "Structured",
    countries: countriesMerged,
    entityCount: entity_count,
    entityTypes: schemataMerged,
    frequency: coverage?.frequency,
    maintainer,
    name,
    publisher,
    summary,
    tags: tags || [],
    title,
    updatedAt: updated_at,
  })
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