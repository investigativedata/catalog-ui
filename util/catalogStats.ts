import { ICountry } from "@investigativedata/ftmq";
import filterOptions, { TFilterField } from "./filterOptions";
import { IDatasetTransformed } from "./transformFTM";

export type TFilterValueCount = {
  value: string;
  label?: string;
  count: number;
};

export type TFilterValueCounts = {
  contentType: TFilterValueCount[];
  countries: TFilterValueCount[];
  frequency: TFilterValueCount[];
  tags: TFilterValueCount[];
};

const getFieldCounts = (items: IDatasetTransformed[], field: TFilterField) =>
  items
    .map((item) => item[field] as string)
    .reduce((acc: any, fieldValue: string) => {
      const existingCount: number = acc[fieldValue] || 0;
      return { ...acc, [fieldValue]: existingCount + 1 };
    }, {});

const getOrderedFieldCounts = (
  items: IDatasetTransformed[],
  field: TFilterField,
) => {
  const order = filterOptions.find((filterGroup) => filterGroup.field === field)
    ?.options;

  const counts = getFieldCounts(items, field);

  return (
    order?.map((value) => ({
      value,
      count: counts[value as keyof typeof counts] || 0,
    })) || []
  );
};

const getCountryCounts = (items: IDatasetTransformed[]) => {
  const flattenedCountries: any[] = items
    .map(({ countries }) => countries)
    .flat()
    .filter((country) => !!country);

  const countLookup: Record<string, TFilterValueCount> =
    flattenedCountries.reduce(
      (acc, item) => ({
        ...acc,
        [item.code]: {
          label: item.label,
          count: (acc[item.code]?.count || 0) + 1,
        },
      }),
      {},
    );

  return Object.entries(countLookup)
    .map(([value, { label, count }]) => ({ value, label, count }))
    .sort((a, b) => (a.count < b.count ? 1 : -1));
};

const getTags = (items: IDatasetTransformed[]) => {
  const tagsRaw = items
    .map(({ tags }) => tags)
    .flat()
    .filter((tag) => !!tag);

  return [...new Set(tagsRaw)].map((tag) => ({ value: tag, count: 0 }));
};

export default function calculateCatalogStats(
  datasets: IDatasetTransformed[],
): TFilterValueCounts {
  return {
    contentType: getOrderedFieldCounts(datasets, "contentType"),
    countries: getCountryCounts(datasets),
    frequency: getOrderedFieldCounts(datasets, "frequency"),
    tags: getTags(datasets) as TFilterValueCount[],
  };
}
