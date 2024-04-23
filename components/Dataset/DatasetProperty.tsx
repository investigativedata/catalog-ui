import { isValidElement } from 'react';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { ReactNode } from "react";


type DatasetPropertyProps = {
 label: string,
 labelEndDecorator?: ReactNode | null,
 value?: string | Element | null
};

export default function DatasetProperty({ label, labelEndDecorator, value }: DatasetPropertyProps) {
  return (
   <Stack>
      <Typography level="body-sm" endDecorator={labelEndDecorator} sx={{ textTransform: 'capitalize' }}>{label}</Typography>
      {typeof value === 'string' && (
        <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      )}
      {isValidElement(value) && value}
   </Stack>
  );
}