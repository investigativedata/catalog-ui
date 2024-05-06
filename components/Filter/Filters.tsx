import Stack from "@mui/joy/Stack";
import type { IDataset, } from "@investigativedata/ftmq";
import AccordionGroup from "@mui/joy/AccordionGroup";
import FilterGroup from "./FilterGroup";
import { filterOptions } from '../../util';


export type TFilters = { 
  items: IDataset[],
  filters: any,
  setFilters: (filters: any) => void
};

export default function Filters({ items, filters, setFilters }: TFilters) {
  const toggleFilter = (field, value) => {
    const valIndex = filters[field].indexOf(value);
    if (valIndex === -1) {
      filters[field].push(value)
    } else {
      filters[field].splice(valIndex)
    }
    console.log('setting filters', filters)
    setFilters({...filters})
  }

  return (
    <AccordionGroup sx={{ backgroundColor: "none" }}>
      {/* {Object.entries(filterOptions).map(([field, options]) => ( */}
        <FilterGroup
          items={items}
          label="frequency"
          field="coverage.frequency"
          options={filterOptions["coverage.frequency"]}
          activeValues={filters["coverage.frequency"]}
          onChange={toggleFilter}
        />
      {/* ))} */}
    </AccordionGroup>
  );
}
