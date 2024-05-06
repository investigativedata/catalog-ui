import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

import FilterCount from './Filter/FilterCount';

export type TSearch = {
  value: string,
  setValue: (value: string) => void,
  filterCount: number,
  clearFilters: () => void
};

export default function Search({ filterCount, clearFilters, value, setValue }): TSearch {
  const filterIconPath = `/static/icons/${filterCount > 0 ? 'filter_filled' : 'filter'}.svg`
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={0}
    >
      <Input
        color="neutral"
        variant="plain"
        size="sm"
        placeholder="Search in Data Catalog"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        startDecorator={<img src={`/static/icons/search.svg`} />}
        sx={{
          '--Input-focusedThickness': '0rem',
          background: "#fff",
          padding: "13px 18px"
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <FilterCount value={filterCount} onClear={clearFilters} />
        <img src={filterIconPath} style={{ width: "2rem", height: "2rem" }} />
      </Stack>
    </Stack>
    
  )
}
