import { isValidElement } from 'react';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon"
import { ReactNode } from "react";
import Link from 'next/link';

// import FrequencyIcon from "/static/icons/frequency.svg";

import Property from '../Property';

type DatasetPropertyValueProps = {
  value: string | Element,
  type?: string,
  href?: string
}

export function DatasetPropertyValue({ value, type, href }: DatasetPropertyValueProps) {
  let startDecorator;

  if (type === "frequency") {
    startDecorator = <img src={`/static/icons/frequency.svg`} />
  }

  const content = (
    <Typography level="body-sm" sx={theme => ({ fontWeight: !href ? 'bold' : '400', color: theme.vars.palette.common.black, lineHeight: "130%" })} startDecorator={startDecorator}>
      <Property value={value} type={type} />
    </Typography>
  );

  if (href) {
    return (
      <Link href={href}>{content}</Link>
    )
  }

  return content;
}

type DatasetPropertyProps = {
  label: string,
  labelEndDecorator?: ReactNode | null,
  value: string | Element,
  type?: string
  href?: string
};

export default function DatasetProperty({ label, labelEndDecorator, value, type, href }: DatasetPropertyProps) {
  return (
   <Stack>
      <Typography
        level="body-xs"
        endDecorator={labelEndDecorator}
        sx={theme => ({ 
          textTransform: 'uppercase',
          fontSize: "0.65rem",
          color: theme.vars.palette.common.black,
          fontWeight: '400',
          lineHeight: "130%",
          letterSpacing: "0.2px"
        })}
      >
        {label}
      </Typography>
      <DatasetPropertyValue value={value} type={type} href={href} />
   </Stack>
  );
}