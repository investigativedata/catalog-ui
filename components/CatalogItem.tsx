import { Card } from "@investigativedata/style";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
import type { IDataset } from "@investigativedata/ftmq";

import DatasetProperty from "./Dataset/DatasetProperty";
import CountryLabel from "./CountryLabel";

function CatalogItemDetails({ dataset }: CatalogItemProps) {
  const { publisher, maintainer } = dataset;
  return (
    <Box sx={theme => ({
      padding: "1rem",
      backgroundColor: theme.vars.palette.success[100],
    })}>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        spacing={3}
       
      >
        <Stack
          spacing={2}
        >
          <DatasetProperty label="frequency" value={dataset.coverage?.frequency} />
          <DatasetProperty label="type" value={dataset.coverage?.frequency} />
          <DatasetProperty label="category" value={dataset.category || "Other"} />
        </Stack>
        <div>
          {publisher && (
            <DatasetProperty
              label="publisher"
              labelEndDecorator={<CountryLabel iso={publisher.country} />}
              value={
                publisher.url ? <Link href={publisher.url}>{publisher.name}</Link> : publisher.name
              }
            />
          )}
          {maintainer && (
            <DatasetProperty
              label="maintainer"
              labelEndDecorator={<CountryLabel iso={maintainer.country} />}
              value={
                maintainer.url ? <Link href={maintainer.url}>{maintainer.name}</Link> : maintainer.name
              }
            />
          )}
        </div>
      </Stack>
      <DatasetProperty label="last updated" value={dataset.updated_at} />
    </Box>
    
  )
}

type CatalogItemProps = {
  dataset: IDataset;
};


export default function CatalogItem({ dataset }: CatalogItemProps) {
  return (
   <Link href={`/${dataset.name}`}>
    <Card
      title={dataset.title || dataset.name}
      color="success"
      variant="soft"
      sx={{
        padding: "0",
        border: "1px solid #1DE9B6",
        overflow: "hidden"
      }}
    >
      <CatalogItemDetails dataset={dataset} />
    </Card>
   </Link>
  );
}