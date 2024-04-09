import Page from "~/components/Page";
import CatalogScreen from "~/screens/CatalogScreen";
import { CATALOG_URI } from "~/settings";
import { getCatalog } from "@investigativedata/ftmq";

const breadcrumbs = [
  {
    label: "Catalog",
  },
];

export default async function CatalogPage() {
  const catalog = await getCatalog(CATALOG_URI);
  return (
    <Page crumbs={breadcrumbs}>
      <CatalogScreen catalog={catalog} />
    </Page>
  );
}
