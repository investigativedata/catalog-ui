"use client";

import { useEffect, useState } from "react";
import type { ICatalog, IDataset, TDatasetFrequency } from "@investigativedata/ftmq";
import Stack from "@mui/joy/Stack";
import Grid from '@mui/joy/Grid';
import Typography from "@mui/joy/Typography";
import Divider from '@mui/joy/Divider';
import Fuse from "fuse.js";

import Catalog from "~/components/Catalog";
import Search from "~/components/Search";
import Filters from "~/components/Filter/Filters";
import FilterResultSummary from "~/components/Filter/FilterResultSummary";

const initializeSearchIndex = (items: IDataset[]) => {
  return new Fuse(items, {
    keys: ["title", "coverage.frequency"],
  });
}

const initialFilters = {
  'coverage.frequency': []
}

export default function CatalogScreen({ catalog }: { catalog: ICatalog }) {
  const searchIndex = initializeSearchIndex(catalog?.datasets)
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [filteredItems, setFilteredItems] = useState([]);
  
  useEffect(() => {
    let searchPredicate = [];

    if (searchValue.length > 0) {
      searchPredicate.push({ title: searchValue })
    }

    const filtersFlat = Object.entries(activeFilters)
      .map(([field, values]) => (
        !!values.length ? values.map(v => ({ [field]: v })) : []
      ))
      .filter(d => !!d.length)
      .map(d => ({$or: d}))

    if (filtersFlat.length > 0) {
      searchPredicate = [...searchPredicate, ...filtersFlat];
    }

    if (searchPredicate.length === 0) {
      setFilteredItems(catalog.datasets)
    } else {
      
      const results = searchIndex.search({ $and: searchPredicate })
        .map((result) => result.item);

      setFilteredItems(results)
    }
  }, [searchValue, activeFilters]);


  const clearFilters = () => {
    setActiveFilters(initialFilters)
  }

  return (
    <Stack>
      <Grid container spacing={2} sx={{ flexGrow: 1, position: '' }}>
        <Grid xs={12} md={3}>
          <div style={{ position: "fixed", width: "inherit", top: "58px", overflow: "hidden" }}>
            <Typography level="h1" sx={{ fontSize: "48px" }}>Find the data for your investigations</Typography>
            <Typography level="body-md">Here you will find over 100 frequently updated datasets derived from various official sources.</Typography>
            <Typography level="body-md">You do not know where to start? We created carefully selected collections for you.</Typography>
          </div>
        </Grid>
        <Grid xs={12} md={6}>
          <Catalog datasets={filteredItems} />
          <code>
            <pre>{JSON.stringify(catalog.datasets, null, 2)}</pre>
          </code>
        </Grid>
        <Grid xs={12} md={3}>
          <div style={{ position: "fixed", width: "inherit", top: "58px", overflow: "hidden" }}>
            <FilterResultSummary active={filteredItems.length} total={catalog.datasets.length} />
            <Search value={searchValue} setValue={setSearchValue} filterCount={5} clearFilters={clearFilters} />
            <Filters items={filteredItems} filters={activeFilters} setFilters={setActiveFilters} />
          </div>
        </Grid>
      </Grid>
    </Stack>
  );
}
