"use client";

import { useEffect, useState } from "react";
import type { ICatalog, IDataset } from "@investigativedata/ftmq";
import Stack from "@mui/joy/Stack";
import Grid from '@mui/joy/Grid';
import Typography from "@mui/joy/Typography";
import Fuse from "fuse.js";

import Catalog from "~/components/Catalog";
import Search from "~/components/Search";
import FilterGroup from "~/components/Filter/FilterGroup";

const initializeSearchIndex = (items: IDataset[]) => {
  return new Fuse(items, {
    keys: ["title", "summary", "coverage.frequency"],
  });
}

export default function CatalogScreen({ catalog }: { catalog: ICatalog }) {
  const searchIndex = initializeSearchIndex(catalog?.datasets)
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredItems, setFilteredItems] = useState([])
  
  useEffect(() => {
    console.log('changed', searchValue)

    if (searchValue.length === 0) {
      setFilteredItems(catalog.datasets)
    } else {
      const results = searchIndex.search({
          $and: [{ title: searchValue }] 
        })
        .map((result) => result.item);

      setFilteredItems(results)
    }
  }, [searchValue]);

  return (
    <Stack>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={3}>
          <Search value={searchValue} setValue={setSearchValue} />
          <FilterGroup filters={activeFilters} setFilters={setActiveFilters} />
        </Grid>
        <Grid xs={6}>
          <Catalog datasets={filteredItems} />
          <code>
            <pre>{JSON.stringify(catalog.datasets, null, 2)}</pre>
          </code>
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
