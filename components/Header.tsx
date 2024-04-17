import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Logo } from "@investigativedata/style";

import Breadcrumbs, { TBreadrumb } from "./Breadcrumbs";

export type HeaderProps = {
  crumbs: TBreadrumb[],
  isRoot?: boolean
};

interface IStackItem {
 readonly justifyContent: "left" | "right" | "center";
}

const StackItem = ({
 children,
 justifyContent,
}: React.PropsWithChildren<IStackItem>) => (
 <Box sx={{ width: "33.3%", display: "flex", alignItems: 'center', justifyContent }}>{children}</Box>
);

const Header = ({ crumbs, isRoot }: HeaderProps) => {
  return (
   <Box
     sx={theme => ({
       width: "100%",
       backgroundColor: isRoot ? 'inherit' : theme.vars.palette.success[300],
     })}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
         <StackItem justifyContent="left">
           <IconButton>
             <MenuIcon />
           </IconButton>
         </StackItem>
         <StackItem justifyContent="center">
           <Typography level="h3" sx={{ fs: "1.3125rem", p: 0 }}>
             <Link
               sx={{
                 color: "inherit",
                 textDecoration: "none",
                 "&:hover": { textDecoration: "none" },
               }}
               href="/"
             >
               investigraph
             </Link>
           </Typography>
         </StackItem>
         <StackItem justifyContent="right">
           <Typography level="body-sm">A project by</Typography>
           <Logo />  
         </StackItem>
                 
          
        </Stack>
      </Container>
      <Breadcrumbs crumbs={crumbs} />
    </Box>
  );
}

export default Header;