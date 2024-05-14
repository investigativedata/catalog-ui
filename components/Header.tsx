import { useContext } from "react";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "next/link";

import Breadcrumbs, { TBreadrumb } from "./Breadcrumbs";
import Logo from "./Logo";
import { HeaderScrollContext } from "./PageContext"

export type HeaderProps = {
  crumbs: TBreadrumb[],
  isRoot?: boolean
};

type IStackItem = {
  justifyContent: string,
  mobileHide: boolean
}

const StackItem = ({
 children,
 justifyContent,
 mobileHide
}: React.PropsWithChildren<IStackItem>) => (
  <Box sx={{
    width: "33.3%",
    display: mobileHide ? { xs: "none", md:"flex" } : "flex",
    justifyContent,
    overflow: "visible"
  }}>
    {children}
  </Box>
);

const Header = ({ crumbs, isRoot }: HeaderProps) => {
  const headerCollapsed = useContext(HeaderScrollContext)
  return (
    <Box
      sx={theme => ({
        width: "100%",
        position: "fixed",
        zIndex: 10,
        backgroundColor: isRoot ? theme.vars.palette.common.white : theme.vars.palette.success[300],
        height: headerCollapsed ? "var(--header-height-collapsed)" : { xs: "var(--header-height-mobile)", sm: "var(--header-height)" },
        padding: "0 26px",
        boxShadow: isRoot ? `0px 4px 32px 0px ${theme.vars.palette.common.white}` : "none",
        transition: "var(--header-transition)"
      })}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="baseline"
          spacing={2}
          style={{ paddingTop: headerCollapsed ? "15px" : "50px", transition: "var(--header-transition)" }}
        >
          <StackItem justifyContent="left" mobileHide>
            {!isRoot && (
              <Breadcrumbs crumbs={crumbs} />
            )}
          </StackItem>
          <StackItem justifyContent="center">
            <Typography
              level="title-lg"
              noWrap
              sx={{ 
                overflow: "visible", 
                fontSize: { xs: "1.5rem", sm: headerCollapsed ? "1.5rem" : "2.5rem" },
                transition: "var(--header-transition)"
              }}
            >
              <Link
                underline="none"
                style={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "none" },
                }}
                href="/"
              >
                Investigraph Data Catalog
              </Link>
            </Typography>
          </StackItem>
          <StackItem justifyContent="right" mobileHide>
            <Logo />
          </StackItem>
        </Stack>
    </Box>
  );
}

export default Header;