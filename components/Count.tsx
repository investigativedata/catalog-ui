import Chip from '@mui/joy/Chip'

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
      {value}
    </Chip>
  );
}
