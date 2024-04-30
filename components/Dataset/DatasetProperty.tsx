import { isValidElement } from 'react';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon"
import { ReactNode } from "react";
// import FrequencyIcon from "/static/icons/frequency.svg";

import Property from '../Property';

type DatasetPropertyValueProps = {
  value: string | Element,
  type?: string
}

export function DatasetPropertyValue({ value, type }: DatasetPropertyValueProps) {
  if (isValidElement(value)) {
    return value;
  }

  let startDecorator;

  if (type === "frequency") {
    startDecorator = <img src={`/static/icons/frequency.svg`} />
  }

  return (
    <Typography level="body-md" sx={{ fontWeight: 'bold' }} startDecorator={startDecorator}>
      <Property value={value} type={type} />
    </Typography>
  );
}

type DatasetPropertyProps = {
  label: string,
  labelEndDecorator?: ReactNode | null,
  value: string | Element,
  type?: string
};

export default function DatasetProperty({ label, labelEndDecorator, value, type }: DatasetPropertyProps) {
  return (
   <Stack>
      <Typography
        level="body-sm"
        endDecorator={labelEndDecorator}
        sx={{ textTransform: 'capitalize' }}
      >
        {label}
      </Typography>
      <DatasetPropertyValue value={value} type={type} />
   </Stack>
  );
}