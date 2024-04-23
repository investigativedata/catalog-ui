import { isValidElement } from 'react';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { ReactNode } from "react";

import Property from '../Property';


type DatasetPropertyProps = {
 label: string,
 labelEndDecorator?: ReactNode | null,
 value: string | Element,
 type?: string
};

export default function DatasetProperty({ label, labelEndDecorator, value, type }: DatasetPropertyProps) {
  console.log(type)
  return (
   <Stack>
      <Typography level="body-sm" endDecorator={labelEndDecorator} sx={{ textTransform: 'capitalize' }}>{label}</Typography>
      {!isValidElement(value) && (
        <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
          <Property value={value} type={type} />
        </Typography>
      )}
      {isValidElement(value) && value}
   </Stack>
  );
}