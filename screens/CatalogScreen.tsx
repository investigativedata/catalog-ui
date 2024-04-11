"use client";

import type { ICatalog } from "@investigativedata/ftmq";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import Grid from '@mui/joy/Grid';
import Typography from "@mui/joy/Typography";
import Link from "next/link";

import Catalog from "~/components/Catalog";
import Search from "~/components/Search";
import FilterGroup from "~/components/FilterGroup";

export default function CatalogScreen({ catalog }: { catalog: ICatalog }) {
  return (
    <Stack>
      <Typography level="h1">Data catalog</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={3}>
          <Search />
          <FilterGroup />
        </Grid>
        <Grid xs={6}>
          <Catalog catalog={catalog} />
        </Grid>
        <Grid xs={3}>
          <Typography level="h3">Welcome to the Investigraph Data Catalog.</Typography>
          <Typography level="body-md">Here you will find over 100 frequently updated datasets derived from various official sources.</Typography>
          <Typography level="body-md">You do not know where to start? We created carefully selected collections for you.</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
