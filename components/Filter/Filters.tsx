import Stack from "@mui/joy/Stack";
import FilterSummary from "./FilterSummary";

export type TFilters = { 
  filters: any,
  setFilters: (filters: any) => void
};

export default function Filters({ filters, setFilters }: TFilters) {
  return (
    <Stack>
      <FilterSummary />
      <FilterGroup
        label="frequency"
        field="coverage.frequency"
        options={[
          { value: 'daily', label: 'Daily', count: 5 },
          { value: 'weekly', label: 'Weekly', count: 5 },
          { value: 'monthly', label: 'Monthly', count: 5 },
          { value: 'yearly', label: 'Yearly', count: 5 },
          { value: 'unknown', label: 'Unknown', count: 5 },
        ]}
      />

    </Stack>
  );
}
