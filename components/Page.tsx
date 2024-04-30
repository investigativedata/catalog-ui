"use client";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { theme } from "@investigativedata/style";
import Box from "@mui/joy/Box";

import type { TBreadrumb } from "./Breadcrumbs";

import Header from './Header';
import Footer from './Footer';
import styles from "./Page.module.css";

type TPage = { crumbs: TBreadrumb[], isRoot?: boolean };

export default function Page({
  crumbs,
  isRoot,
  children,
}: React.PropsWithChildren<TPage>) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Header crumbs={crumbs} isRoot={isRoot} />
      <Box
        sx={theme => ({
          paddingTop: isRoot ? '80px' : 0,
          backgroundColor: isRoot ? 'inherit' : theme.vars.palette.success[50],
        })}
      >
        <section className={styles.page}>
          {children}
        </section>
      </Box>
      <Footer />
    </CssVarsProvider>
  );
}
