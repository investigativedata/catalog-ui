import { Suspense } from "react";
import { ICatalog, getCatalog } from "@investigativedata/ftmq";
import Page from "~/components/Page";
import StoreContext from "~/components/Store";
import CatalogScreen from "~/screens/CatalogScreen";
import { CATALOG_URI } from "~/settings";
import calculateCatalogStats from "~/util/catalogStats";
import { transformFTMCatalog } from "~/util/transformFTM";

const breadcrumbs = [
  {
    label: "Catalog",
  },
];

export default async function CatalogPage() {
  const catalog = await getCatalog(CATALOG_URI);
  const { datasets } = transformFTMCatalog(catalog as ICatalog);
  const filterValueCounts = calculateCatalogStats(datasets);

  return (
    <Page crumbs={breadcrumbs} isRoot>
      <Suspense fallback={"loading..."}>
        <StoreContext datasets={datasets} filterValueCounts={filterValueCounts}>
          <CatalogScreen />
        </StoreContext>
      </Suspense>
    </Page>
  );
}
