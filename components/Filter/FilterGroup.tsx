import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Chip from '@mui/joy/Chip';

import Count from "../Count";
import { getFilterValueCount } from "../../util";
import FilterCount from "./FilterCount";

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
  const isActive = activeValues.length > 0;
  const endDecorator = isActive ? <FilterCount value={activeValues.length} verbose /> : `(${options.length})`

  return (
    <Accordion
      variant="soft"
      disabled={true}
      expanded={true}
      color={isActive ? 'success' : undefined}
    >
      <AccordionSummary indicator={null}>
        <Typography level="body-md" endDecorator={endDecorator}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
}
