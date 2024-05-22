
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';

import Count from "../Count";
import { DatasetPropertyValue } from "../Dataset/DatasetProperty";
import { TFilter } from "./Filter/Filters";

export type TFilterGroupItems = { 
  type: string,
  items: TFilter[],
  activeValues: string[],
  onChange: (value: string) => void
};

export default function FilterGroupItems({ items, activeValues, onChange, type }: TFilterGroupItems) {
  return (
    <List>
      {items.map(({ value, count }) => (
        <ListItem key={value}>
          <Checkbox
            label={<DatasetPropertyValue displayValue={value} value={value} type={type} style={theme => ({ color: theme.vars.palette.common.black })} />}
            variant="soft"
            color="neutral"
            checked={activeValues.includes(value)}
            onChange={() => onChange(value)}
            slotProps={{ 
              checkbox: { 
                sx: theme => ({
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: theme.vars.palette.success[50] },
                })
              }
            }}
          />
          <Count value={count} />
        </ListItem>
      ))}
    </List>
  );
}
