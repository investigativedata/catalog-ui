import Chip from '@mui/joy/Chip'

export default function Count({ value }: { value: number }) {
  return (
    <Chip variant="soft" color="neutral" size="sm">{value}</Chip>
  );
}
