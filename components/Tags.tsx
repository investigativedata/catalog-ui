import Stack from "@mui/joy/Stack";
import { capitalizeFirstLetter } from "~/util/util";
import Tag from "./Tag";

export type TTags = {
  items: string[] | null | undefined;
  activeFilters?: string[];
  onClick?: (value: string) => void;
};

export default function Tags({ items, activeFilters, onClick }: TTags) {
  if (!items?.length) return null;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {items.map((value) => (
        <Tag
          key={value}
          active={activeFilters?.includes(value)}
          label={capitalizeFirstLetter(value)}
          onClick={onClick ? () => onClick(value) : undefined}
        />
      ))}
    </Stack>
  );
}
