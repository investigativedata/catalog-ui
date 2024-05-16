"use client";

import { useContext, useEffect, useState } from "react";
import type { ICatalog, IDataset, TDatasetFrequency } from "@investigativedata/ftmq";
import Grid from '@mui/joy/Grid';
import Typography from "@mui/joy/Typography";
import Box from '@mui/joy/Box';
import Fuse from "fuse.js";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import Catalog from "~/components/Catalog";
import CatalogControls from "~/components/CatalogControls";
import FilterResultSummary from "~/components/Filter/FilterResultSummary";
import { filterOptions } from "~/util";
import { HeaderScrollContext } from '../components/PageContext';


const initializeSearchIndex = (items: IDataset[]) => {
  return new Fuse(items, {
    keys: ["title", "coverage.frequency"],
  });
}

type IFixedColumn = {
  style?: any
}

const FixedColumn = ({ children, style = {} }: React.PropsWithChildren<IFixedColumn>) => {
  const headerCollapsed = useContext(HeaderScrollContext)

  return (
    <Grid xs={12} md={4} lg={3} sx={{ 
      position: { xs: "static", md: "sticky" },
      top: headerCollapsed ? "var(--header-height-collapsed)" : { xs: "var(--header-height-mobile)", md: "var(--header-height)" },
      maxHeight: { xs: "0", md: headerCollapsed ? "calc(100vh - var(--header-height-collapsed))" : "calc(100vh - var(--header-height) - 2rem)" },
      marginBottom: "auto",
      overflow: "scroll",
      transition: "var(--header-transition)",
      paddingTop: { xs: "4rem", md: "1rem" },
      ...style 
    }}>
      {children}
    </Grid>
  );
}

export default function CatalogScreen({ catalog }: { catalog: ICatalog }) {
  if (!catalog?.datasets) {
    return null;
  }

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const getFiltersFromUrl = () => filterOptions.reduce(
    (acc, { field }) => ({ ...acc, [field]: searchParams.getAll(field) }),
    {}
  );

  const searchIndex = initializeSearchIndex(catalog?.datasets)
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState(getFiltersFromUrl());
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filterObj = getFiltersFromUrl()
    setActiveFilters(filterObj)
  }, [searchParams]);
  
  
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
    router.push(pathname)
  }

  return (
    <Grid container spacing={4} sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <FixedColumn>
        <Box>
          <Typography level="h1" sx={{ fontSize: { xs: "2.7rem", sm: "3rem", md: "2.2rem", xl: "3rem" } }}>Find the data for your investigations</Typography>
          <Typography level="body-md" style={{ paddingBottom: '2rem' }}>Here you will find over 100 frequently updated datasets derived from various official sources.</Typography>
          <Typography level="body-md">You do not know where to start? We created carefully selected collections for you.</Typography>
        </Box>
      </FixedColumn>
      <Grid xs={12} md={4} lg={6} sx={{ order: { xs: "2", md: "1", paddingTop: "2rem" }}}>
        <Catalog datasets={filteredItems} />
        <Box padding="4rem 0 4rem" textAlign="center">
          <img src={`/static/icons/ok.svg`} />
          <Typography level="body-md">You have seen all datasets.</Typography>
          <Typography level="body-md">Keep checking – we add datasets regularly.</Typography>
        </Box>
        {/* <code>
          <pre>{JSON.stringify(catalog.datasets, null, 2)}</pre>
        </code> */}
      </Grid>
      <FixedColumn style={{ order: { xs: "1", md: "2" }}}>
        <CatalogControls
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          resultSummary={
            <FilterResultSummary active={filteredItems.length} total={catalog.datasets.length} />
          }
        />
      </FixedColumn>
    </Grid>
  );
}
