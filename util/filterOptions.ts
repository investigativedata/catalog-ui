import { ReadonlyURLSearchParams } from "next/navigation";
import { TFilterValueCounts } from "./catalogStats";

export type TFilterField = "contentType" | "frequency" | "tags" | "countries";

export type TFilterOption = {
  readonly label: string;
  readonly field: TFilterField;
  readonly type?: string;
  readonly options?: string[];
};

export type TActiveFilters = {
  readonly contentType: string[];
  readonly frequency: string[];
  readonly tags: string[];
  readonly countries: string[];
};

const filterOptions: TFilterOption[] = [
  {
    label: "Type of data",
    field: "contentType",
    type: "datatype",
    options: ["documents", "structured", "mixed"],
  },
  {
    label: "Frequency",
    field: "frequency",
    options: ["daily", "weekly", "monthly", "yearly", "unknown"],
  },
  {
    label: "Tags",
    field: "tags",
    type: "tag",
  },
  {
    label: "Country / Region",
    field: "countries",
    type: "country",
  },
];

export default filterOptions;

export const getFiltersFromUrlParams = (
  searchParams: ReadonlyURLSearchParams,
): TActiveFilters =>
  filterOptions.reduce(
    (acc, { field }) => ({ ...acc, [field]: searchParams.getAll(field) }),
    {
      contentType: [],
      frequency: [],
      tags: [],
      countries: [],
    },
  );

export const emptyFilters: TActiveFilters = {
  contentType: [],
  frequency: [],
  tags: [],
  countries: [],
};

export const emptyFilterValueCounts: TFilterValueCounts = {
  contentType: [],
  frequency: [],
  tags: [],
  countries: [],
};
