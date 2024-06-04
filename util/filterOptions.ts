export type TFilterField = "contentType" | "frequency" | "tags" | "countries";

export type TFilterOption = {
  label: string;
  field: TFilterField;
  type?: string;
  options?: string[];
};

export type TActiveFilters = {
  contentType: string[];
  frequency: string[];
  tags: string[];
  countries: string[];
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
