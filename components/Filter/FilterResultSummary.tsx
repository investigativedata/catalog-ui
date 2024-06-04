import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export type TFilterResultSummary = {
  active: number;
  total: number;
};

export default function FilterResultSummary({
  active,
  total,
}: TFilterResultSummary) {
  return (
    <div>
      <Typography level="body-md">
        <b>{active} Datasets</b>
        {active !== total && <span> out of {total}</span>}
      </Typography>
      <Divider />
    </div>
  );
}
