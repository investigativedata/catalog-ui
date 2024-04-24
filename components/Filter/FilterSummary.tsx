import { Typography } from "@mui/joy";
import Stack from "@mui/joy/Stack";

export type TFilterSummary = { 
  filters: any,
  setFilters: (filters: any) => void
};

export default function FilterSummary({ filters, setFilters }: TFilterSummary) {
  const count = 9;
  return (
    <div>
      <Typography level="body-md">Datasets</Typography>
    </div>
  );
}
