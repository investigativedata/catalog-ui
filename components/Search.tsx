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
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      spacing={3}
    >
      <Input
        color="neutral"
        variant="plain"
        size="sm"
        placeholder="Search in Data Catalog"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <FilterCount value={filterCount} onClear={clearFilters} />
    </Stack>
    
  )
}
