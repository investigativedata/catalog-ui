import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";

export type TFilterResultSummary = {
  active: number
  total: number,
};

export default function FilterResultSummary({ active, total }: TFilterResultSummary) {
  return (
    <div>
      <Typography level="body-md">
        <b>{active} Datasets</b>
        <span> out of {total}</span>
      </Typography>
      <Divider />
    </div>
  );
}
