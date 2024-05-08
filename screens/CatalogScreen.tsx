"use client";

import { useEffect, useState } from "react";
import type { ICatalog, IDataset, TDatasetFrequency } from "@investigativedata/ftmq";
import Stack from "@mui/joy/Stack";
import Grid from '@mui/joy/Grid';
import Typography from "@mui/joy/Typography";
import Box from '@mui/joy/Box';
import Fuse from "fuse.js";

import Catalog from "~/components/Catalog";
import Search from "~/components/Search";
import Filters from "~/components/Filter/Filters";
import FilterResultSummary from "~/components/Filter/FilterResultSummary";
import { filterOptions } from "~/util";

const initializeSearchIndex = (items: IDataset[]) => {
  return new Fuse(items, {
    keys: ["title", "coverage.frequency"],
  });
}

const getInitialFilters = () => filterOptions.reduce(
  (acc, { field }) => ({ ...acc, [field]: [] }),
  {}
);

type IFixedColumn = {
  style?: any
}

const FixedColumn = ({ children, style = {} }: React.PropsWithChildren<IFixedColumn>) => (
  <Grid xs={12} md={4} lg={3} sx={{ 
    position: "sticky",
    top: { xs: "var(--header-height-mobile)", sm: "var(--header-height)" },
    maxHeight: { xs: "calc(100vh - var(--header-height-mobile) - 4rem)", sm: "calc(100vh - var(--header-height) - 4rem)" },
    marginBottom: "auto",
    overflow: "scroll",
    ...style 
  }}>
    {children}
  </Grid>
);


export default function CatalogScreen({ catalog }: { catalog: ICatalog }) {
  const searchIndex = initializeSearchIndex(catalog?.datasets)
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState(getInitialFilters());
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
    setActiveFilters(getInitialFilters())
  }

  

  return (
    <Grid container spacing={4} sx={{ flexGrow: 1 }}>
      <FixedColumn>
        <Box>
          <Typography level="h1" sx={{ fontSize: { xs: "3rem", md: "2.2rem", xl: "3rem" } }}>Find the data for your investigations</Typography>
          <Typography level="body-md" style={{ marginBottom: '25px' }}>Here you will find over 100 frequently updated datasets derived from various official sources.</Typography>
          <Typography level="body-md">You do not know where to start? We created carefully selected collections for you.</Typography>
        </Box>
      </FixedColumn>
      <Grid xs={12} md={4} lg={6} sx={{ order: { xs: "2", md: "1", paddingTop: "2rem" }}}>
        <Catalog datasets={filteredItems} />
        <Box padding="4rem 0 1rem" textAlign="center">
          <img src={`/static/icons/ok.svg`} />
          <Typography level="body-md">You have seen all datasets.</Typography>
          <Typography level="body-md">Keep checking – we add datasets regularly.</Typography>
        </Box>
        {/* <code>
          <pre>{JSON.stringify(catalog.datasets, null, 2)}</pre>
        </code> */}
      </Grid>
      <FixedColumn style={{ order: { xs: "1", md: "2" }}}>
        <Search
          value={searchValue}
          setValue={setSearchValue}
          filterCount={Object.values(activeFilters).flat().length}
          clearFilters={clearFilters}
          resultSummary={
            <FilterResultSummary active={filteredItems.length} total={catalog.datasets.length} />
          }
          filters={
            <Filters items={filteredItems} filters={activeFilters} setFilters={setActiveFilters} />
          }
        />
      </FixedColumn>
    </Grid>
  );
}
