import { isValidElement } from 'react';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon"
import { ReactNode } from "react";
import Link from 'next/link';

// import FrequencyIcon from "/static/icons/frequency.svg";

import Property from '../Property';
import { CountryFlag } from '../CountryLabel';

type DatasetPropertyValueProps = {
  value: string | Element,
  displayValue: string | Element,
  type?: string,
  href?: string
  style?: any
}

export function DatasetPropertyValue({ displayValue, value, type, href, style }: DatasetPropertyValueProps) {
  let startDecorator;

  if (type === "frequency") {
    startDecorator = <img src={`/static/icons/frequency.svg`} />
  } else if (type === "country") {
    startDecorator = <CountryFlag iso={value} />
  } else if (type === "datatype") {
    startDecorator = <img src={`/static/icons/${value}.svg`} />
  }

  const content = (
    <Typography level="body-sm" startDecorator={startDecorator} sx={style}>
      <Property value={displayValue || value} type={type} />
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
  const capitalize = type === 'string' || type === 'frequency';

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
          letterSpacing: "0.2px",
          alignItems: 'flex-start'
        })}
      >
        {label}
      </Typography>
      <DatasetPropertyValue
        value={value}
        type={type}
        href={href}
        style={theme => ({ 
          fontWeight: !href ? 'bold' : '400', 
          color: theme.vars.palette.common.black, 
          lineHeight: "130%",
          textTransform: capitalize ? 'capitalize' : 'none'
        })}
      />
   </Stack>
  );
}