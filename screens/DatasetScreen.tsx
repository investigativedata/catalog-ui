"use client";

import type { IDataset } from "@investigativedata/ftmq";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Link } from "@mui/joy";

import DatasetProperty from "~/components/Dataset/DatasetProperty";

// const Coverage = ({ coverage }: { coverage: ICoverage }) => (
//   <>
//     <div>
//       <Typography level="body-sm">Entities:</Typography>
//       <Typography fontWeight="lg">{coverage.entities}</Typography>
//     </div>
//     {coverage.countries.length > 0 && (
//       <div>
//         <Typography level="body-sm">Countries:</Typography>
//         <Typography fontWeight="lg">{coverage.countries.length}</Typography>
//       </div>
//     )}
//   </>
// );

const DatasetSectionHeader = ({ label, active, count }: {  }) => {
  return (
    <Typography level="h3" sx={{ textTransform: 'capitalize' }}>{label}</Typography>
  );
}

const DatasetMetadataMain = ({ dataset }: { dataset: IDataset }) => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={6}>
          <DatasetProperty label="frequency" value={dataset.coverage?.frequency} />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="type" value={dataset.coverage?.frequency} />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="last updated" value={dataset.updated_at} />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="category" value={dataset.category || "Other"} />
        </Grid>
      </Grid>
      <Typography level="body-sm">{dataset.summary}</Typography>
      <DatasetProperty label="slug" value={dataset.name} />
    </Stack>
  );
}

const DatasetMetadataEntities = ({ dataset }: { dataset: IDataset }) => {
  return (
    <Stack spacing={2}>
      <DatasetProperty label="entities" value={dataset.entity_count} />
      <DatasetSectionHeader label="schemas" active={true} count={20} />
      <DatasetSectionHeader label="countries" active={true} />
    </Stack>
  );
}

const DatasetMetadataSecondary = ({ dataset }: { dataset: IDataset }) => {
  return (
    <Stack spacing={2}>
      <Button component="a" href="" variant="outlined">
        Browse this data
      </Button>
      <DatasetSectionHeader label="publisher" active={!!dataset.publisher} />
      {dataset.publisher && (
        <div>
          {dataset.publisher.url ? (
            <Link href={dataset.publisher.url}>{dataset.publisher.name}</Link>
          ) : (
            <Typography>{dataset.publisher.name}</Typography>
          )}
          {dataset.publisher.description && (
            <Typography level="body-sm">{dataset.publisher.description}</Typography>
          )}
          {dataset.publisher.country && (
            <Typography level="body-sm">{dataset.publisher.country}</Typography>
          )}
        </div>
      )}
      <DatasetSectionHeader label="maintainer" active={!!dataset.maintainer} />
      {dataset.maintainer && (
        <div>
          {dataset.maintainer.url ? (
            <Link href={dataset.maintainer.url}>{dataset.maintainer.name}</Link>
          ) : (
            <Typography>{dataset.maintainer.name}</Typography>
          )}
          {dataset.maintainer.description && (
            <Typography level="body-sm">{dataset.maintainer.description}</Typography>
          )}
          {dataset.maintainer.country && (
            <Typography level="body-sm">{dataset.maintainer.country}</Typography>
          )}
        </div>
      )}
    </Stack>
  );
}


export default function DatasetScreen({ dataset }: { dataset: IDataset }) {
  // const entitiesUrl = `/entities?dataset=${dataset.name}`;
  // const getSearchUrl = (param: string, value: string) =>
  //   `${entitiesUrl}&${param}=${value}`;

  return (
    <Stack>
      <Typography level="h2">{dataset.title || dataset.name}</Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <DatasetMetadataMain dataset={dataset} />
        <DatasetMetadataEntities dataset={dataset} />
        <DatasetMetadataSecondary dataset={dataset} />
      </Stack>

      
    
      {/* <DatasetLink dataset={dataset} />
      <Dataset dataset={dataset} />
      <DatasetMeta dataset={dataset} />
      <PublisherMeta publisher={dataset.publisher} /> */}

      {/* {dataset.coverage && <Coverage coverage={dataset.coverage} />} */}

      {/* {dataset.publisher && (
        <div>
          <Typography level="body-sm">Publisher:</Typography>
          {dataset.publisher.url ? (
            <Link href={dataset.publisher.url}>{dataset.publisher.name}</Link>
          ) : (
            <Typography>{dataset.publisher.name}</Typography>
          )}
          <Typography level="body-sm">{dataset.publisher.description}</Typography>
        </div>
      )} */}
      <code>
        <pre>{JSON.stringify(dataset, null, 2)}</pre>
      </code>
    </Stack>    
  );
}
