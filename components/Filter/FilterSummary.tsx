import { Typography } from "@mui/joy";

import FilterChip from "./FilterChip";
import Count from "../Count";

export type TFilterSummary = {
  count: number,
  filters: any,
  setFilters: (filters: any) => void
};

export default function FilterSummary({ count, filters, setFilters }: TFilterSummary) {
  return (
    <div>
      <Typography level="body-md" endDecorator={<Count value={count} />}>Datasets</Typography>
      {Object.entries(filters).map(([field, values]) => (
        values.map(value => <FilterChip field={field} value={value} />)
      ))}
    </div>
  );
}
