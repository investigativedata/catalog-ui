import React, { Suspense, useCallback, useContext } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import calculateCatalogStats from "~/util/catalogStats";
import { TFilterField } from "~/util/filterOptions";
import FilterCount from "../Filter/FilterCount";
import FilterModal from "../Filter/FilterModal";
import FilterResultSummary from "../Filter/FilterResultSummary";
import Filters from "../Filter/Filters";
import { CatalogContext } from "./CatalogContext";

export type TCatalogControls = {
  totalCount: number;
};

export default function CatalogControls({ totalCount }: TCatalogControls) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!!value) {
        if (params.has(name, value)) {
          params.delete(name, value);
        } else {
          params.append(name, value);
        }
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const toggleFilter = (field: TFilterField, value: string) => {
    router.push(pathname + "?" + createQueryString(field, value));
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const clearFilterGroup = (field: TFilterField) => {
    router.push(pathname + "?" + createQueryString(field));
  };

  const populatedContext = useContext(CatalogContext);
  if (!populatedContext) {
    return null;
  }
  const { searchValue, setSearchValue, activeFilters, filteredItems } =
    populatedContext;

  const activeFilterCount = Object.values(activeFilters).flat().length;

  const filtersComponentProps = {
    filters: activeFilters,
    filterValueCounts: calculateCatalogStats(filteredItems),
    toggleFilter,
    clearFilterGroup,
  };

  const resultSummary = (
    <FilterResultSummary active={filteredItems.length} total={totalCount} />
  );

  return (
    <Stack gap={2}>
      {resultSummary}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Input
          color="neutral"
          variant="plain"
          size="sm"
          placeholder="Search in Data Catalog"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          startDecorator={<img src={`/static/icons/search.svg`} />}
          sx={{
            "--Input-focusedThickness": "0rem",
            background: "#fff",
            padding: "13px 18px",
            flexGrow: 1,
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <FilterCount
            value={activeFilterCount}
            onClear={clearFilters}
            withIcon
          />
          <FilterModal filterCount={activeFilterCount}>
            {resultSummary}
            <Filters {...filtersComponentProps} defaultExpanded={false} />
          </FilterModal>
        </Stack>
      </Stack>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Filters {...filtersComponentProps} defaultExpanded />
      </Box>
    </Stack>
  );
}
