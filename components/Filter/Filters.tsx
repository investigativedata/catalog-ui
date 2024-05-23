import AccordionGroup from "@mui/joy/AccordionGroup";

import FilterGroup from "./FilterGroup";
import filterOptions from '../../util/filterOptions';
import type { TFilterValueCounts } from '~/util/catalogStats';

export type TFilters = { 
  filters: string[],
  toggleFilter: (field: string, value: string) => void,
  clearFilterGroup: (field: string) => void,
  defaultExpanded: boolean,
  filterValueCounts: TFilterValueCounts
};

export default function Filters({ filters, toggleFilter, clearFilterGroup, defaultExpanded, filterValueCounts }: TFilters) {
  console.log(filters)
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
