import Link from "next/link";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/system/Box";

export default function Logo() {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography level="body-md">A project by</Typography>
      <Link target="_blank" rel="noopener" href="https://investigativedata.io/">
        <AspectRatio style={{ width: "61px" }} variant="plain">
          <img
            src={`/static/IDIO_basic_light.svg`}
            style={{ borderBottom: "1px solid" }}
          />
        </AspectRatio>
      </Link>
    </Box>
  );
}
