import Stack from "@mui/joy/Stack";
import FilterSummary from "./FilterSummary";

export type TFilterGroup = { 
  filters: any,
  setFilters: (filters: any) => void
};

export default function FilterGroup({ filters, setFilters }: TFilterGroup) {
  return (
    <Stack>
      <FilterSummary />

    </Stack>
  );
}
