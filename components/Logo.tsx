import Box from '@mui/system/Box';
import Typography from '@mui/system/Typography';
import Link from "@mui/joy/Link";
import AspectRatio from "@mui/joy/AspectRatio";


export default function Logo() {
  return (
   <Box>
     <Typography level="body-md" noWrap>A project by</Typography>
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
  )
}