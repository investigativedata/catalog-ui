import Box from '@mui/system/Box';
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import AspectRatio from "@mui/joy/AspectRatio";


export default function Logo() {
  return (
   <Box sx={{ display: "flex" }}>
     <Typography level="body-md">A project by</Typography>
     <Link
      underline="always"
      target="_blank"
      rel="noopener"
      href="https://investigativedata.io/"
      sx={{
       textDecoration: "underline"
     }}
     >
      <AspectRatio style={{ width: "61px" }} variant="plain">
       <img src={`/static/IDIO_basic_light.svg`} />
      </AspectRatio>
     </Link>
   </Box>
  );
}