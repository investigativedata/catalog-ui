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

  const clearFilterGroup = (field) => {
    setFilters({
      ...filters,
      [field]: []
    })
  }

  console.log(filters)

  return (
    <AccordionGroup sx={{ backgroundColor: "none" }}>
      {filterOptions.map(({ label, field, values, type }) => (
        <FilterGroup
          key={field}
          items={items}
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
