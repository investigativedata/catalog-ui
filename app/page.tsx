import { ICatalog, getCatalog } from "@investigativedata/ftmq";
import Page from "~/components/Page";
import CatalogScreen from "~/screens/CatalogScreen";
import { CATALOG_URI } from "~/settings";
import { transformFTMCatalog } from "~/util/transformFTM";
import catalog from "../public/investigraph.eu.json";

const breadcrumbs = [
  {
    label: "Catalog",
  },
];

export default async function CatalogPage() {
  // const catalog = await getCatalog(CATALOG_URI);
  const catalogTransformed = transformFTMCatalog(catalog as ICatalog);

  return (
    <Page crumbs={breadcrumbs} isRoot>
      <CatalogScreen catalog={catalogTransformed} />
    </Page>
  );
}
