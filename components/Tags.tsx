import Stack from "@mui/joy/Stack";

import Tag from "./Tag";
import { TFilter } from "./Filter/Filters";
import { capitalizeFirstLetter } from "~/util/util";

export type TTags = { 
  items: TFilter[],
  activeValues?: string[],
  onClick?: (value: string) => void
};

export default function Tags({ items, activeValues, onClick }: TTags) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {items.map(value => (
        <Tag
          key={value}
          label={capitalizeFirstLetter(value)}
          active={activeValues?.includes(value)}
          onClick={onClick ? () => onClick(value) : undefined }
        />
      ))}
    </Stack>
  );
}
