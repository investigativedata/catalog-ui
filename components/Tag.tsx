import Chip from "@mui/joy/Chip";

export type TTag = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function Tag({ label, active, onClick }: TTag) {
  const isStatic = !onClick;

  return (
    <Chip
      variant="soft"
      size="sm"
      onClick={onClick}
      slotProps={{
        action: {
          sx: (theme) => ({
            backgroundColor: active ? theme.vars.palette.success[200] : "#FFF",
            padding: "2px 8px",
            pointerEvents: isStatic ? "none" : "all",
            "&:hover": { backgroundColor: theme.vars.palette.success[50] },
          }),
        },
      }}
    >
      <span>{label}</span>
    </Chip>
  );
}
