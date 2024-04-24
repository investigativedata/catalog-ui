import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';

import Count from "../Count";
import { getFilterValueCount } from "../../util";

export type TFilter = {
  label: string,
  value: string,
}

export type TFilterGroup = { 
  items: IDataset[],
  label: string,
  field: string,
  options: TFilter[],
  activeValues: string[],
  onChange: (field: string, value: string) => void
};

export default function FilterGroup({ items, label, field, options, activeValues, onChange }: TFilterGroup) {
  return (
    <Stack>
      <Typography level="body-md" endDecorator={`(${options.length})`}>{label}</Typography>
      <div role="group" aria-labelledby={label}>
        <List>
           {options.map(({ label, value }) => (
            <ListItem key={value}>
               <Checkbox
                 label={label}
                 checked={activeValues.includes(value)}
                 onChange={() => onChange(field, value)}
               />
               <Count value={getFilterValueCount(items, field, value)} />
            </ListItem>
           ))}
        </List>
      </div>
    </Stack>
  );
}
