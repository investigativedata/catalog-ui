import AccordionGroup from "@mui/joy/AccordionGroup";
import type { TFilterValueCounts } from "~/util/catalogStats";
import filterOptions, {
  TActiveFilters,
  TFilterField,
} from "../../util/filterOptions";
import FilterGroup from "./FilterGroup";

export type TFilters = {
  filters: TActiveFilters;
  toggleFilter: (field: TFilterField, value: string) => void;
  clearFilterGroup: (field: TFilterField) => void;
  defaultExpanded: boolean;
  filterValueCounts: TFilterValueCounts;
};

export default function Filters({
  filters,
  toggleFilter,
  clearFilterGroup,
  defaultExpanded,
  filterValueCounts,
}: TFilters) {
  return (
    <AccordionGroup sx={{ backgroundColor: "none" }}>
      {filterOptions.map(({ label, field, type }) => (
        <FilterGroup
          key={field}
          defaultExpanded={defaultExpanded}
          label={label}
          field={field}
          options={filterValueCounts[field]}
          type={type}
          activeFilters={filters[field]}
          onChange={toggleFilter}
          onClear={clearFilterGroup}
        />
      ))}
    </AccordionGroup>
  );
}
