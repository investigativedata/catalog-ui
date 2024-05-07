import Chip from "@mui/joy/Chip";
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from "@mui/joy/Typography";

export type TFilterCount = {
  value: number,
  verbose?: boolean,
  onClear: () => void
};

export default function FilterCount({ onClear, value, verbose }: TFilterCount) {
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
        padding: "2px 8px"
      })}
    >
      <span>{value}</span>
      {verbose && <span> selected</span>}
    </Chip>
  )
}