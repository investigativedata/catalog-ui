
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';

import Count from "../Count";
import DatasetPropertyValue from "../Dataset/DatasetPropertyValue";
import { TFilter } from "./Filter/Filters";
import { capitalizeFirstLetter } from '~/util/util';

export type TFilterGroupItems = { 
  type: string,
  items: TFilter[],
  activeValues: string[],
  onChange: (value: string) => void
};

export default function FilterGroupItems({ items, activeValues, onChange, type }: TFilterGroupItems) {
  return (
    <List>
      {items.map(({ value, label, count }) => (
        <ListItem key={value}>
          <Checkbox
            label={
              <DatasetPropertyValue
                displayValue={label || capitalizeFirstLetter(value)}
                value={value}
                type={type}
                style={theme => ({ color: count > 0 ? theme.vars.palette.common.black : "inherit" })} 
              />
            }
            variant="soft"
            color="neutral"
            checked={activeValues.includes(value)}
            disabled={count === 0}
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
          {count > 0 && <Count value={count} />}
        </ListItem>
      ))}
    </List>
  );
}
