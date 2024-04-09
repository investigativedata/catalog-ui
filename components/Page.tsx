"use client";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";

import { theme } from "@investigativedata/style";

import type { TBreadrumb } from "./Breadcrumbs";

import Breadcrumbs from "./Breadcrumbs";
import styles from "./Page.module.css";

type TPage = { crumbs: TBreadrumb[] };

export default function Page({
  crumbs,
  children,
}: React.PropsWithChildren<TPage>) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <section className={styles.page}>
        <Breadcrumbs crumbs={crumbs} />
        {children}
      </section>
    </CssVarsProvider>
  );
}
