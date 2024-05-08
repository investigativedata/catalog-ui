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
import FilterGroupItems from "./FilterGroupItems";
import { DatasetPropertyValue } from "../Dataset/DatasetProperty";
import Tags from "../Tags";
import { TFilter } from "./Filter/Filters";



export type TFilterGroup = { 
  items: IDataset[],
  label: string,
  field: string,
  type: string,
  options: TFilter[],
  activeValues: string[],
  onChange: (field: string, value: string) => void
  onClear: (field: string) => void
};

export default function FilterGroup({ items, label, field, options, activeValues, onChange, onClear, type }: TFilterGroup) {
  const isActive = activeValues.length > 0;
  const endDecorator = isActive 
    ? <FilterCount
      value={activeValues.length}
      verbose
      onClear={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onClear(field);
      }}
    /> 
    : <span style={{ fontWeight: "normal" }}>{`(${options.length})`}</span>

  return (
    <Accordion
      variant="soft"
      defaultExpanded
      sx={theme => ({ backgroundColor: theme.vars.palette.common.white })}
    >
      <AccordionSummary
        indicator={null}
        variant="soft"
        slotProps={{ 
          button: { 
            sx: theme => ({
              backgroundColor: `${isActive ? theme.vars.palette.success[200] : theme.vars.palette.common.white} !important`,
              borderBottom: "1px solid",
              borderBottomColor: isActive ? theme.vars.palette.success[600] : theme.vars.palette.common.black,
            })
          }
        }}
      >
        <Typography
          level="body-sm"
          fontWeight="bold"
          endDecorator={endDecorator}
          sx={(theme) => ({
            textTransform: "capitalize",
            color: theme.vars.palette.common.black
          })}
        >
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails  sx={theme => ({ backgroundColor: theme.vars.palette.common.white })}>
        <div role="group" aria-labelledby={label}>
          {type === 'tag' && (
            <Tags
              items={options}
              activeValues={activeValues}
              onClick={(value) => onChange(field, value)}
            />
          )}
          {type !== 'tag' && (
            <FilterGroupItems 
              type={type}
              items={options}
              activeValues={activeValues}
              onChange={(value) => onChange(field, value)}
            />
          )}
          
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
