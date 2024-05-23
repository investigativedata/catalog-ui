import Chip from '@mui/joy/Chip'


export type TTag = {
  label: string,
  onClick?: () => void
};

export default function Tag({ label, onClick }: TTag) {
  const isStatic = !onClick;

  return (
    <Chip
      variant="soft"
      size="sm"
      onClick={onClick}
      slotProps={{
        action: {
          sx: theme => ({
            backgroundColor: theme.vars.palette.success[200],
            padding: "2px 8px",
            pointerEvents: isStatic ? 'none' : 'all',
            "&:hover": { backgroundColor: theme.vars.palette.success[50] },
          })
        }
      }}
    >
      <span>{label}</span>
    </Chip>
  );
}
