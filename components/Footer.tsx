import Box from "@mui/joy/Box";
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
  <Link href={href}>
    <Typography level="body-sm">{label}</Typography>
  </Link>
);

const commonStyle = {
  width: "100%",
  zIndex: 10,
  padding: "1.5rem"
}

const FooterMobile = () => {
 return (
  <Box
    sx={theme => ({
      ...commonStyle,
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
      <Stack direction="row" alignItems="center" spacing={2}>
        <FooterLink href={"/"} label="Legal Notice" />
        <FooterLink href={"/"} label="Code of Conduct" />
        <FooterLink href={"/"} label="About investigativedata.io" />
      </Stack>
       <Typography level="body-sm" sx={{ display: "inline-flex", whiteSpace: "nowrap", fontWeight: "bold" }}>
          This project has been funded by
          <FooterLink href={"/"} label="Media Lab Bayern" />
        </Typography>
     </Stack>
   </Box>
 )
}

const FooterDesktop = () => {
  return (
    <Box
      sx={theme => ({
       ...commonStyle,
       backgroundColor: 'inherit',
       justifyContent: 'center',
       display: { xs: 'flex', md: 'none' },
      })}
    >
     <Box> 
       <Logo />
     </Box>
    </Box>
  );
}

const Footer = () => {
 return (
  <>
    <FooterMobile />
    <FooterDesktop />
  </>
 )
}

export default Footer;