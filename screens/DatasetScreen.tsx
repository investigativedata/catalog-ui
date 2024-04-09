"use client";

import type { IDataset } from "@investigativedata/ftmq";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function DatasetScreen({ dataset }: { dataset: IDataset }) {
  const entitiesUrl = `/entities?dataset=${dataset.name}`;
  const getSearchUrl = (param: string, value: string) =>
    `${entitiesUrl}&${param}=${value}`;
  return (
    <Stack>
      <Typography level="h1">{dataset.title || dataset.name}</Typography>
      <code>
        <pre>{JSON.stringify(dataset, null, 2)}</pre>
      </code>
    </Stack>
  );
}
