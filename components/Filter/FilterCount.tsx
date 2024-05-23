import Chip from "@mui/joy/Chip";
import ChipDelete from '@mui/joy/ChipDelete';
import IconButton from "@mui/joy/IconButton";

export type TFilterCount = {
  value: number,
  verbose?: boolean,
  withIcon?: boolean,
  onClear: (evt: any) => void
};

export default function FilterCount({ onClear, value, verbose, withIcon }: TFilterCount) {
  if (value === 0) {
    return null;
  }
  
  return (
    <Chip
      variant="solid"
      color="neutral"
      size="sm"
      endDecorator={
        <ChipDelete
          onDelete={onClear}
          sx={(theme) => ({
            backgroundColor: theme.vars.palette.common.black
          })}
        />
      }
      sx={(theme) => ({
        height: "2rem",
        backgroundColor: theme.vars.palette.common.black,
        color: theme.vars.palette.common.white,
        padding: "2px 8px",
      })}
      slotProps={{
        label: {
          sx:{
            display: "flex",
            alignItems: "center",
            gap: "3px"
          }
        }
      }}
    >
      <span>{value}</span>
      {withIcon && (
        <IconButton sx={{ display: { xs: "none", md: "inline-flex" }, minWidth: "0", padding: "0" }} disabled>
          <img
            src="/static/icons/filter_white.svg"
            style={{ 
              width: "1rem",
              height: "1rem"
            }}
          />
        </IconButton>
      )}
      {verbose && <span> selected</span>}
    </Chip>
  )
}