import type { IDataset, } from "@investigativedata/ftmq";
import AccordionGroup from "@mui/joy/AccordionGroup";

import FilterGroup from "./FilterGroup";
import filterOptions from '../../filterOptions';

export type TFilter = {
  label: string,
  value: string,
}

export type TFilters = { 
  filters: TFilter[],
  toggleFilter: (field: string, value: string) => void,
  clearFilterGroup: (field: string) => void,
  defaultExpanded: boolean,
  filterItemCounts: any
};

export default function Filters({ filters, toggleFilter, clearFilterGroup, defaultExpanded, filterItemCounts }: TFilters) {
  // const mergeOptionsWithCounts = (options, counts) => options.map(opt => counts[opt])
  
  return (
    <AccordionGroup sx={{ backgroundColor: "none" }}>
      {filterOptions.map(({ label, field, type }) => (
        <FilterGroup
          key={field}
          defaultExpanded={defaultExpanded}
          label={label}
          field={field}
          options={filterItemCounts[field]}
          type={type}
          activeValues={filters[field]}
          onChange={toggleFilter}
          onClear={clearFilterGroup}
        />
      ))}
    </AccordionGroup>
  );
}
