import { useCallback } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';

import FilterCount from '../Filter/FilterCount';
import FilterModal from '../Filter/FilterModal';
import Filters from '../Filter/Filters';

export type TCatalogControls = {
  searchValue: string,
  setSearchValue: (value: string) => void,
  activeFilters: any,
  clearFilters: () => void,
  resultSummary: any,
  filterItemCounts: any
};

export default function CatalogControls({ activeFilters, clearFilters, searchValue, setSearchValue, filterItemCounts, resultSummary }): TCatalogControls {
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
  
  const activeFilterCount = Object.values(activeFilters).flat().length;

  const filtersComponentProps = {
    filters: activeFilters,
    filterItemCounts,
    toggleFilter,
    clearFilterGroup
  }

  return (
    <Stack gap={2}>
      {resultSummary}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Input
          color="neutral"
          variant="plain"
          size="sm"
          placeholder="Search in Data Catalog"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          startDecorator={<img src={`/static/icons/search.svg`} />}
          sx={{
            '--Input-focusedThickness': '0rem',
            background: "#fff",
            padding: "13px 18px",
            flexGrow: 1
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <FilterCount value={activeFilterCount} onClear={clearFilters} withIcon />
          <FilterModal filterCount={activeFilterCount}>
            {resultSummary}
            <Filters {...filtersComponentProps} defaultExpanded={false} />
          </FilterModal>
        </Stack>
      </Stack>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Filters {...filtersComponentProps} defaultExpanded />
      </Box>
    </Stack>
  )
}