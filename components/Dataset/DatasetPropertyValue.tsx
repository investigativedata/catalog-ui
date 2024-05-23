import Typography from "@mui/joy/Typography";
import Link from 'next/link';

import Property from '../Property';
import { CountryFlag } from '../CountryLabel';

type DatasetPropertyValueProps = {
  value: string | number | null | undefined,
  displayValue?: string,
  type?: string,
  href?: string | null,
  style?: any
}

export default function DatasetPropertyValue({ displayValue, value, type, href, style }: DatasetPropertyValueProps) {
  if (value === null || value === undefined) return null;

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