import { ICountry } from "@investigativedata/ftmq";
import { TFilterValueCounts } from "./catalogStats";
import { IDatasetTransformed } from "./transformFTM";

export function capitalizeFirstLetter(str?: string | null) {
  if (!str) return "";

  const castStr = str.toString();

  return castStr.charAt(0).toUpperCase() + castStr.slice(1);
}

export function applyActiveFilters(items: IDatasetTransformed[], filters: any) {
  let filteredItems = items;

  if (filters.contentType.length > 0) {
    filteredItems = filteredItems.filter(({ contentType }) =>
      filters.contentType.includes(contentType),
    );
  }
  if (filters.frequency.length > 0) {
    filteredItems = filteredItems.filter(({ frequency }) =>
      filters.frequency.includes(frequency),
    );
  }

  if (filters.tags.length > 0) {
    filteredItems = filteredItems.filter(({ tags }) =>
      filters.tags.some((t: string) => tags?.includes(t)),
    );
  }

  if (filters.countries.length > 0) {
    filteredItems = filteredItems.filter(({ countries }) =>
      filters.countries.some(
        (c: string) => countries?.find(({ code }) => code === c),
      ),
    );
  }

  return filteredItems;
}
