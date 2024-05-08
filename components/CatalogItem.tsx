import Card from "@mui/joy/Card";
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from '@mui/joy/Link';
import type { IDataset } from "@investigativedata/ftmq";

import DatasetProperty, { DatasetPropertyValue } from "./Dataset/DatasetProperty";
import DatasetLastUpdated from "./Dataset/DatasetLastUpdated";
import Property from "./Property";
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
        <Typography
          level="body-xs"
          sx={theme => ({ 
            textTransform: 'uppercase',
            fontSize: "0.65rem",
            color: theme.vars.palette.common.black,
            fontWeight: '400',
            lineHeight: "130%",
            letterSpacing: "0.2px"
          })}
        >
          <span>Last updated: </span>
          <Property value={dataset.updated_at} type="date" />
          {/* <DatasetLastUpdated datetime={dataset.updated_at} /> */}
        </Typography>
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
      sx={theme => ({
        padding: "0",
        border: `1px solid ${theme.vars.palette.success[600]}`,
        overflow: "hidden",
        transition: "box-shadow 200ms",
        "&:hover": { 
          boxShadow: `4px 4px 0 0 ${theme.vars.palette.success[600]}`
        },
      })}
    >
      <CardContent>
        <Box sx={{ padding: "1rem" }}>
          <DatasetPropertyValue
            displayValue="Documents"
            value="documents"
            type="datatype"
            style={{ marginBottom: "0.5rem" }}
          />
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