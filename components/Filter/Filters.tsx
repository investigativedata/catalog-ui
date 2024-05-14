import { useCallback } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import type { IDataset, } from "@investigativedata/ftmq";
import AccordionGroup from "@mui/joy/AccordionGroup";


import FilterGroup from "./FilterGroup";
import { filterOptions } from '../../util';

export type TFilter = {
  label: string,
  value: string,
}

export type TFilters = { 
  items: IDataset[],
  filters: TFilter[],
  setFilters: (filters: TFilter[]) => void
};

export default function Filters({ items, filters, setFilters }: TFilters) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (!!value) {
        if (params.has(name, value)) {
          params.delete(name, value)
        } else {
          params.append(name, value)
        }
      } else {
        params.delete(name)
      }
 
      return params.toString()
    },
    [searchParams]
  )

  const toggleFilter = (field, value) => {
    router.push(pathname + '?' + createQueryString(field, value))
  }

  const clearFilterGroup = (field) => {
    router.push(pathname + '?' + createQueryString(field))
  }

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
