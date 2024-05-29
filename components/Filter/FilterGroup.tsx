import Typography from "@mui/joy/Typography";
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Box from '@mui/joy/Box';

import FilterCount from "./FilterCount";
import FilterGroupItems from "./FilterGroupItems";
import Tags from "../Tags";
import type { TFilterValueCount } from "~/util/catalogStats"
import { TFilterField } from "~/util/filterOptions";


export type TFilterGroup = { 
  label: string,
  field: TFilterField,
  type?: string,
  options: TFilterValueCount[],
  activeFilters: string[],
  onChange: (field: TFilterField, value: string) => void
  onClear: (field: TFilterField) => void,
  defaultExpanded: boolean
};

export default function FilterGroup({ label, field, options, activeFilters, onChange, onClear, type, defaultExpanded }: TFilterGroup) {
  const isActive = activeFilters.length > 0;
  const endDecorator = isActive 
    ? <FilterCount
      value={activeFilters.length}
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
      defaultExpanded={defaultExpanded}
      sx={theme => ({ backgroundColor: theme.vars.palette.common.white, border: "none" })}
    >
      <AccordionSummary
        variant="soft"
        slotProps={{ 
          button: { 
            sx: theme => ({
              backgroundColor: `${isActive ? theme.vars.palette.success[200] : theme.vars.palette.common.white} !important`,
              borderBottom: "1px solid",
              borderBottomColor: isActive ? theme.vars.palette.success[600] : theme.vars.palette.common.black,
              paddingLeft: { xs: "0", md: "12px" }
            })
          },
          indicator: {
            sx: theme => ({
              "svg": {
                color: theme.vars.palette.common.black
              }
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
            <Box sx={{ paddingTop: "1rem" }}>
              <Tags
                items={options.map(({ value }) => value).filter(value => !!value)}
                activeFilters={activeFilters}
                onClick={(value) => onChange(field, value)}
              />
            </Box>
          )}
          {type !== 'tag' && (
            <FilterGroupItems 
              type={type}
              items={options}
              activeFilters={activeFilters}
              onChange={(value) => onChange(field, value)}
            />
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
