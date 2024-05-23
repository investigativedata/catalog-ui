import Stack from "@mui/joy/Stack";

import Tag from "./Tag";
import { capitalizeFirstLetter } from "~/util/util";

export type TTags = { 
  items: string[] | null | undefined,
  onClick?: (value: string) => void
};

export default function Tags({ items, onClick }: TTags) {
  if (!items?.length) return null;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {items.map(value => (
        <Tag
          key={value}
          label={capitalizeFirstLetter(value)}
          onClick={onClick ? () => onClick(value) : undefined }
        />
      ))}
    </Stack>
  );
}
