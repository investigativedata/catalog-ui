"use client";

import { Suspense, useContext } from "react";
import Link from "next/link";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Catalog from "~/components/Catalog/Catalog";
import CatalogContext from "~/components/Catalog/CatalogContext";
import CatalogControls from "~/components/Catalog/CatalogControls";
import { ICatalogTransformed } from "~/util/transformFTM";
import { HeaderScrollContext } from "../components/PageContext";

type IFixedColumn = {
  style?: any;
};

const FixedColumn = ({
  children,
  style = {},
}: React.PropsWithChildren<IFixedColumn>) => {
  const headerCollapsed = useContext(HeaderScrollContext);

  return (
    <Grid
      xs={12}
      md={4}
      lg={3}
      sx={{
        position: { xs: "static", md: "sticky" },
        top: headerCollapsed
          ? "var(--header-height-collapsed)"
          : { xs: "var(--header-height-mobile)", md: "var(--header-height)" },
        maxHeight: {
          xs: "0",
          md: headerCollapsed
            ? "calc(100vh - var(--header-height-collapsed))"
            : "calc(100vh - var(--header-height) - 2rem)",
        },
        marginBottom: "auto",
        overflow: "scroll",
        transition: "var(--header-transition)",
        paddingTop: { xs: "4rem", md: "1rem" },
        ...style,
      }}
    >
      {children}
    </Grid>
  );
};

export default function CatalogScreen({
  catalog,
}: {
  catalog: ICatalogTransformed;
}) {
  return (
    <Grid container spacing={4} sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <Suspense>
        <CatalogContext catalog={catalog}>
          <FixedColumn>
            <Box>
              <Typography
                level="h1"
                sx={{
                  fontSize: {
                    xs: "2.7rem",
                    sm: "3rem",
                    md: "2.2rem",
                    xl: "3rem",
                  },
                }}
              >
                Find the data for your investigations
              </Typography>
              <Typography level="body-md" style={{ paddingBottom: "2rem" }}>
                Here you will find over 200 frequently updated datasets derived
                from various official sources.
              </Typography>
              <Typography level="body-md">
                You do not know where to start? We created carefully selected
                collections for you, such as{" "}
                <Link href="/?tags=dokukratie">Dokukratie</Link>,{" "}
                <Link href="/?tags=investigraph.eu">EU Datasets</Link> or{" "}
                <Link href="/?tags=OpenSanctions">OpenSanctions</Link>.
              </Typography>
            </Box>
          </FixedColumn>
          <Grid
            xs={12}
            md={4}
            lg={6}
            sx={{ order: { xs: "2", md: "1", paddingTop: "2rem" } }}
          >
            <Catalog />
          </Grid>
          <FixedColumn style={{ order: { xs: "1", md: "2" } }}>
            <CatalogControls totalCount={catalog?.datasets?.length || 0} />
          </FixedColumn>
        </CatalogContext>
      </Suspense>
    </Grid>
  );
}
