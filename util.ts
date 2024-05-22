import { ICatalog, IDataset, ISchemataStats } from "@investigativedata/ftmq";

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
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
  
  console.log(tags)

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

const getCountryCounts = (items) => {
  const flattenedCountries = items
    .map(({ countries }) => countries)
    .flat()

  return getFieldCounts(flattenedCountries, 'code')
}

const getTagCounts = (items) => (
  items
    .map(({ tags }) => tags)
    .flat()
    .reduce((acc, curr) => (
      acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    ), {})
)

export function calculateCatalogStats(datasets) {
  return ({
    category: getFieldCounts(datasets, 'category'),
    contentType: getFieldCounts(datasets, 'contentType'),
    countries:  getCountryCounts(datasets),
    frequency: getFieldCounts(datasets, 'frequency'),
    tags: getTagCounts(datasets)
  })
}