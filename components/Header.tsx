import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AspectRatio from "@mui/joy/AspectRatio";

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
       position: "fixed",
       zIndex: 10,
       backgroundColor: isRoot ? 'inherit' : theme.vars.palette.success[300],
      //  boxShadow: `0px 4px 32px 0px`,
      //  height: "128px"
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
         {!isRoot && (
            <Container maxWidth="xl">
              <Breadcrumbs crumbs={crumbs} />
            </Container>
          )}
         </StackItem>
         <StackItem justifyContent="center">
           <Typography level="h3" sx={{ fs: "1.3125rem", p: 0 }}>
             <Link
               underline="none"
               sx={{
                 textDecoration: "none",
                 "&:hover": { textDecoration: "none" },
               }}
               href="/"
             >
              Investigraph Data Catalog
             </Link>
           </Typography>
         </StackItem>
         <StackItem justifyContent="right">
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
         </StackItem>
        </Stack>
      </Container>
    </Box>
  );
}

export default Header;