import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Container from "@mui/joy/Container";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AspectRatio from "@mui/joy/AspectRatio";

import Logo from "./Logo";

export type FooterProps = {};

interface IFooterLink {
  href: string,
  label: string
}

const FooterLink = ({ href, label }: React.PropsWithChildren<IFooterLink>) => (
  <Chip variant="plain" color="neutral" size="sm" slotProps={{ action: { component: 'a', href: href } }} sx={{ textDecoration: "underline" }}>
     {label}
  </Chip>
);

const Footer = ({ }: FooterProps) => {
  return (
   <>
     <Box
       sx={theme => ({
         width: "100%",
         zIndex: 10,
         backgroundColor: theme.vars.palette.success[300],
         display: { xs: 'none', md: 'block' }
       })}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
         <Container sx={{ display: "inline-flex", gap: "1rem" }}>
           <FooterLink href={"/"} label="Legal Notice" />
           <FooterLink href={"/"} label="Code of Conduct" />
           <FooterLink href={"/"} label="About investigativedata.io" />
         </Container>
          <Typography level="body-sm" sx={{ display: "inline-flex", whiteSpace: "nowrap", fontWeight: "bold" }}>
             This project has been funded by
             <FooterLink href={"/"} label="Media Lab Bayern" />
           </Typography>
        </Stack>
      </Box>
      <Box
        sx={theme => ({
         width: "100%",
         zIndex: 10,
         backgroundColor: theme.vars.palette.success[300],
         display: { xs: 'block', md: 'none' }
        })}
      >
        <Logo />
      </Box>
    </>
  );
}

export default Footer;