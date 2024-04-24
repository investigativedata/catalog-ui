import Chip from "@mui/joy/Chip";
import ChipDelete from '@mui/joy/ChipDelete';

import { DatasetPropertyValue } from "../Dataset/DatasetProperty";

export type TFilterChip = {
  field: string,
  value: string
};

export default function FilterChip({ field, value }: TFilterChip) {
  let type;

  if (field === 'coverage.frequency') {
    type = 'frequency';
  }

  return (
    <Chip
      variant="soft"
      color="neutral"
      size="sm"
      endDecorator={<ChipDelete onDelete={() => alert('Delete')} />}
    >
      <DatasetPropertyValue type={type} value={value} />
    </Chip>
  )
}