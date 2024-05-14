"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { theme } from "@investigativedata/style";
import Box from "@mui/joy/Box";

import type { TBreadrumb } from "./Breadcrumbs";

import Header from './Header';
import Footer from './Footer';
import styles from "./Page.module.css";
import PageContext, { HeaderScrollContext } from './PageContext';

type TPage = { crumbs: TBreadrumb[], isRoot?: boolean };

export default function Page({
  crumbs,
  isRoot,
  children,
}: React.PropsWithChildren<TPage>) {
  const headerCollapsed = useContext(HeaderScrollContext)

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <PageContext>
        <Header crumbs={crumbs} isRoot={isRoot} />
        <Box
          sx={theme => ({
            paddingTop: headerCollapsed ? "var(--header-height-collapsed)" : { xs: "var(--header-height-mobile)", sm: "var(--header-height)" },
            backgroundColor: isRoot ? 'inherit' : theme.vars.palette.success[50],
            transition: "var(--header-transition)"
          })}
        >
          <section className={styles.page}>
            {children}
          </section>
        </Box>
        <Footer />
      </PageContext>
    </CssVarsProvider>
  );
}
