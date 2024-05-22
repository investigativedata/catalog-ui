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
  defaultExpanded: boolean
};

export default function Filters({ filters, toggleFilter, clearFilterGroup, defaultExpanded }: TFilters) {
  return (
    <AccordionGroup sx={{ backgroundColor: "none" }}>
      {filterOptions.map(({ label, field, values, type }) => (
        <FilterGroup
          key={field}
          defaultExpanded={defaultExpanded}
          // items={items}
          label={label}
          field={field}
          options={values}
          type={type}
          activeValues={filters[field]}
          onChange={toggleFilter}
          onClear={clearFilterGroup}
        />
      ))}
    </AccordionGroup>
  );
}
