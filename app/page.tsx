import Page from "~/components/Page";
import CatalogScreen from "~/screens/CatalogScreen";
import { CATALOG_URI } from "~/settings";
import { getCatalog } from "@investigativedata/ftmq";

import { transformFTMCatalog } from "~/util"

import catalog from '../public/investigraph.eu.json'

const breadcrumbs = [
  {
    label: "Catalog",
  },
];

export default async function CatalogPage() {
  // const catalog = await getCatalog(CATALOG_URI);
  const catalogTransformed = transformFTMCatalog(catalog)
  
  return (
    <Page crumbs={breadcrumbs} isRoot>
      <CatalogScreen catalogItems={catalogTransformed} />
    </Page>
  );
}
