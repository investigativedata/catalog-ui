import Chip from '@mui/joy/Chip'

import Property from './Property';

export default function Count({ value }: { value: number }) {
  return (
    <Chip
      variant="soft"
      color="neutral"
      size="sm"
      sx={{ 
        backgroundColor: "#fff",
        padding: "2px 8px"
      }}
    >
      <Property value={value} type="number" />
    </Chip>
  );
}
