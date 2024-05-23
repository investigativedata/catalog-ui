import {
  ICatalog,
  ICountry,
  IDataset,
  IMaintainer,
  IPublisher,
  ISchema,
  ISchemataStats,
  TContentType,
  TDatasetCategory,
  TDatasetFrequency,
} from "@investigativedata/ftmq";


export interface ICatalogTransformed {
  readonly datasets: IDatasetTransformed[] | null;
} 

export interface IDatasetTransformed {
  readonly alephUrl?: string | null;
  readonly category?: TDatasetCategory | string;
  readonly contentType?: TContentType | string | null;
  readonly countries?: ICountry[] | null;
  readonly entityCount?: number | null;
  readonly entityTypes?: ISchema[] | null;
  readonly frequency?: TDatasetFrequency;
  readonly maintainer?: IMaintainer | null;
  readonly name: string;
  readonly publisher?: IPublisher | null;
  readonly summary?: string | null;
  readonly tags?: string[] | null;
  readonly title?: string | null;
  readonly updatedAt?: string | null;
}


export function transformFTMCatalog(catalog: ICatalog): ICatalogTransformed  {
  return ({ datasets: catalog.datasets?.map(transformFTMDataset) || [] })
}

export function transformFTMDataset(dataset: IDataset) {
  const {
    aleph_url,
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

  const countries: ICountry[] = [...(things?.countries || []), ...(intervals?.countries || [])]

  const countriesMerged: ICountry[] = Object.values(
      countries.reduce((acc, item) => {
        acc[item.code] = acc[item.code]
          ? { ...item, count: item.count + acc[item.code].count }
          : item;
        return acc;
      }, {})
    )
    .sort((a: ICountry, b: ICountry) => a.count > b.count ? -1 : 1);
  
  console.log(countriesMerged)
    
  return ({
    alephUrl: aleph_url,
    category: category || "Other",
    contentType: content_type || "Structured",
    countries: countriesMerged as ICountry[],
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