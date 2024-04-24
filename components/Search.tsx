import Input from '@mui/joy/Input';

export type TSearch = {
  value: string,
  setValue: (value: string) => void
};

export default function Search({ value, setValue }): TSearch {
  return (
    <Input
      color="neutral"
      variant="plain"
      size="sm"
      placeholder="Search"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}
