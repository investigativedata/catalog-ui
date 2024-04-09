"use client";

import type { ICatalog } from "@investigativedata/ftmq";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "next/link";

export default function CatalogScreen({ catalog }: { catalog: ICatalog }) {
  return (
    <Stack>
      <Typography level="h1">Data catalog</Typography>
      <List>
        {catalog.datasets?.map((d) => (
          <ListItem key={d.name}>
            <Link href={`/${d.name}`}>{d.title || d.name}</Link>
          </ListItem>
        ))}
      </List>
      <code>
        <pre>{JSON.stringify(catalog, null, 2)}</pre>
      </code>
    </Stack>
  );
}
