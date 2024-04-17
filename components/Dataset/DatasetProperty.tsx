import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";


type DatasetPropertyProps = {
 label: string,
 value?: string | null
};

export default function DatasetProperty({ label, value }: DatasetPropertyProps) {
  return (
   <Stack>
     <Typography level="body-sm">{label}</Typography>
     <Typography level="body-sm">{value}</Typography>
   </Stack>
  );
}