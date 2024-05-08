import Chip from '@mui/joy/Chip'


export type TTag = {
  label: string,
  active: boolean,
  onClick?: () => void
};

export default function Tag({ label, active, onClick }: TTag) {
  return (
    <Chip
      variant="soft"
      size="sm"
      onClick={onClick}
      slotProps={{
        action: {
          sx: theme => ({
            backgroundColor: active ? theme.vars.palette.success[200] : "#fff",
            padding: "2px 8px",
            "&:hover": { backgroundColor: theme.vars.palette.success[50] },
          })
        }
      }}
      
    >
      <span># </span>
      <span>{label}</span>
    </Chip>
  );
}
