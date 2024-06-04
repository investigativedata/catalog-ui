"use client";

import { useContext } from "react";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { theme } from "@investigativedata/style";
import type { TBreadrumb } from "./Breadcrumbs";
import Footer from "./Footer";
import Header from "./Header";
import PageContext, { HeaderScrollContext } from "./PageContext";

type TPage = { crumbs: TBreadrumb[]; isRoot?: boolean };

export default function Page({
  crumbs,
  isRoot,
  children,
}: React.PropsWithChildren<TPage>) {
  const headerCollapsed = useContext(HeaderScrollContext);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <PageContext>
        <Header crumbs={crumbs} isRoot={isRoot} />
        <Box
          sx={(theme) => ({
            paddingTop: headerCollapsed
              ? "var(--header-height-collapsed)"
              : {
                  xs: "var(--header-height-mobile)",
                  sm: "var(--header-height)",
                },
            paddingLeft: { xs: "1rem", sm: "2rem" },
            paddingRight: { xs: "1rem", sm: "2rem" },
            backgroundColor: isRoot
              ? "inherit"
              : theme.vars.palette.success[50],
            transition: "var(--header-transition)",
          })}
        >
          <section>{children}</section>
        </Box>
        <Footer />
      </PageContext>
    </CssVarsProvider>
  );
}
