import Card from "@mui/joy/Card";
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from '@mui/joy/Link';
import type { IDataset } from "@investigativedata/ftmq";

import DatasetProperty from "./Dataset/DatasetProperty";
import CountryLabel from "./CountryLabel";

function CatalogItemDetails({ dataset }: CatalogItemProps) {
  const { publisher, maintainer } = dataset;
  return (
    <Box sx={theme => ({
      padding: "1rem",
      backgroundColor: theme.vars.palette.success[50],
    })}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={2} width="50%">
            <DatasetProperty label="frequency" value={dataset.coverage?.frequency} />
            <DatasetProperty label="type" value={dataset.coverage?.frequency} />
            <DatasetProperty label="category" value={dataset.category || "Other"} />
          </Stack>
          <Stack spacing={2} width="50%">
            {publisher && (
              <DatasetProperty
                label="publisher"
                labelEndDecorator={<CountryLabel iso={publisher.country} />}
                value={publisher.name}
                href={publisher.url}
              />
            )}
            {maintainer && (
              <DatasetProperty
                label="maintainer"
                labelEndDecorator={<CountryLabel iso={maintainer.country} />}
                value={maintainer.name}
                href={maintainer.url}
              />
            )}
          </Stack>
        </Stack>
        <DatasetProperty label="last updated" value={dataset.updated_at} />
      </Stack>
    </Box>
    
  )
}

type CatalogItemProps = {
  dataset: IDataset;
};


export default function CatalogItem({ dataset }: CatalogItemProps) {
  return (
    <Card
      color="success"
      variant="soft"
      size="sm"
      sx={{
        padding: "0",
        border: "1px solid #1DE9B6",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Box sx={{ padding: "1rem" }}>
          <Link
            overlay
            underline="none"
            href={`/${dataset.name}`}
            sx={{ textDecoration: "none" }}
          >
            <Typography level="body-md" sx={{ fontWeight: "bold" }}>
              {dataset.title || dataset.name}
            </Typography>
          </Link>
        </Box>
        <CatalogItemDetails dataset={dataset} />
      </CardContent>
    </Card>
  );
}