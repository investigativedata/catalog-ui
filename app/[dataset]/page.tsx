import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IDataset, getCatalog } from "@investigativedata/ftmq";
import Page from "~/components/Page";
import DatasetScreen from "~/screens/DatasetScreen";
import { CATALOG_URI } from "~/settings";

async function getDataset(name: string): Promise<IDataset> {
  const catalog = await getCatalog(CATALOG_URI);
  const dataset = catalog.datasets?.find((d) => d.name === name);
  if (!dataset) notFound();
  return dataset;
}

type Params = { readonly dataset: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const dataset = await getDataset(params.dataset);
  return {
    title: dataset.title,
    description: dataset.summary,
  };
}

export default async function DatasetPage({ params }: { params: Params }) {
  const dataset = await getDataset(params.dataset);
  const breadcrumbs = [
    {
      label: "Back to Data Catalog",
      url: "/",
    },
    // { label: dataset.title || dataset.name },
  ];

  return (
    <Page crumbs={breadcrumbs}>
      <DatasetScreen dataset={dataset} />
    </Page>
  );
}

export async function generateStaticParams() {
  const catalog = await getCatalog(CATALOG_URI);
  return catalog.datasets?.map((d) => ({ dataset: d.name })) || [];
}
