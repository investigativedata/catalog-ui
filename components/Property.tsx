import numeral from "numeral";

type Value = {
 readonly value: string;
};

const renderDate = ({ value }: Value): string => {
 return new Date(value).toISOString().slice(0, 10);
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