import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';

import FilterCount from './Filter/FilterCount';
import FilterModal from './Filter/FilterModal';
import Filters from './Filter/Filters';

export type TCatalogControls = {
  searchValue: string,
  setSearchValue: (value: string) => void,
  activeFilters: any,
  clearFilters: () => void,
  resultSummary: any,
  filterItemCounts: any
};

export default function CatalogControls({ activeFilters, clearFilters, searchValue, setSearchValue,  filterItemCounts, resultSummary }): TCatalogControls {
  const filterCount = Object.values(activeFilters).flat().length;

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
          <FilterCount value={filterCount} onClear={clearFilters} withIcon />
          <FilterModal filterCount={filterCount}>
            {resultSummary}
            <Filters filters={activeFilters} filterItemCounts={filterItemCounts} defaultExpanded={false} />
          </FilterModal>
        </Stack>
      </Stack>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Filters filters={activeFilters} filterItemCounts={filterItemCounts} defaultExpanded />
      </Box>
    </Stack>
  )
}
