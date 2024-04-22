import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";


type DatasetPropertyProps = {
 label: string,
 value?: string | null
};

export default function DatasetProperty({ label, value }: DatasetPropertyProps) {
  return (
   <Stack>
     <Typography level="body-sm" sx={{ textTransform: 'capitalize' }}>{label}</Typography>
     <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>{value}</Typography>
   </Stack>
  );
}