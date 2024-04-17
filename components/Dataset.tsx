import { Card } from "@investigativedata/style";
import Link from "next/link";

import type { IDatasetPublisher, INKDataset, ICoverage } from "../types";

type DatasetProps = {
  dataset: INKDataset;
};

export default function Dataset({ dataset }: DatasetProps) {
//  console.log(dataset)
  return (
   <Link href={`/${dataset.name}`}>
    <Card title={dataset.title || dataset.name} color="success" variant="outlined">
    </Card>
   </Link>
  );
}