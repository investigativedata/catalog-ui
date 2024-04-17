"use client";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { theme } from "@investigativedata/style";

import type { TBreadrumb } from "./Breadcrumbs";

import Header from './Header';
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
      <section className={styles.page}>
        {children}
      </section>
    </CssVarsProvider>
  );
}
