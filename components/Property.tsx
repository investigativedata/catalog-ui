import numeral from "numeral";
import dayjs from 'dayjs'

type Value = {
 readonly value: string;
};

const renderDate = ({ value }: Value): string => {
  const isToday = dayjs().isSame(value, 'day')
  return dayjs(value).format(isToday ? 'YYYY-MM-DD, HH:MM' : 'YYYY-MM-DD')
};

const renderNumeric = ({ value }: Value): string => {
 const parsedValue = numeral(value);
 console.log(parsedValue, value)
 return parsedValue.format("0,0");
};

type PropertyProps = {
 value: string,
 type?: string
};

export default function Property({ value, type }: PropertyProps) {
  if (type === 'date') {
   return renderDate({ value })
  }

  if (type === 'number') {
   return renderNumeric({ value })
  }
  
  return value;
}