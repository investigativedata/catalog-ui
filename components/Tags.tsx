import Stack from "@mui/joy/Stack";

import Tag from "./Tag";
import { TFilter } from "./Filter/Filters";

export type TTags = { 
  items: TFilter[],
  activeValues: string[],
  onClick?: (value: string) => void
};

export default function Tags({ items, activeValues, onClick }: TTags) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ paddingTop: "1rem" }}>
      {items.map(({ label, value }) => (
        <Tag label={label} active={activeValues.includes(value)} onClick={() => onClick(value)} />
      ))}
    </Stack>
  );
}
