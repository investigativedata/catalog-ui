import dayjs from "dayjs";
import numeral from "numeral";

type Value = {
  readonly value: string | number;
};

const renderDate = ({ value }: Value): string => {
  const isToday = dayjs().isSame(value, "day");
  return dayjs(value).format(isToday ? "YYYY-MM-DD, HH:MM" : "YYYY-MM-DD");
};

const renderNumeric = ({ value }: Value): string => {
  const parsedValue = numeral(value);
  return parsedValue.format("0,0");
};

type PropertyProps = {
  value?: string | number | null;
  type?: string;
};

export default function Property({
  value,
  type,
}: PropertyProps): string | number {
  if (value === null || value === undefined) return "";

  if (type === "date") {
    return renderDate({ value });
  }

  if (type === "number") {
    return renderNumeric({ value });
  }

  return value;
}
