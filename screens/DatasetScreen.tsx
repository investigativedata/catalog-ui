"use client";

import type { IDataset, ISchema, ISchemataStats } from "@investigativedata/ftmq";
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

const DatasetSectionHeader = ({ label, active, count }: { label: string, active: boolean, count?: number }) => {
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
  const { entity_count } = dataset;

  const things = dataset.things as ISchemataStats
  const intervals = dataset.intervals as ISchemataStats

  const schemataMerged = [...(things?.schemata || []), ...(intervals?.schemata || [])]
    .sort((a, b) => a.count > b.count ? -1 : 1);

  const countriesMerged = [...(things?.countries || []), ...(intervals?.countries || [])]
    .sort((a, b) => a.count > b.count ? -1 : 1);

  return (
    <Stack spacing={2}>
      <DatasetProperty label="entities" value={entity_count} />
      <DatasetSectionHeader label="schemas" active={!!schemataMerged.length} count={schemataMerged.length} />
      {schemataMerged.map((d: ISchema) => (
        <div key={d.name}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography level="body-sm">{d.plural}</Typography>
            <Typography level="body-sm">{d.count}</Typography>
          </Stack>
        </div>
      ))}
      <DatasetSectionHeader label="countries" active={true} />
    </Stack>
  );
}

const DatasetMetadataSecondary = ({ dataset }: { dataset: IDataset }) => {
  const { publisher, maintainer } = dataset;

  return (
    <Stack spacing={2}>
      <Button component="a" href="" variant="outlined">
        Browse this data
      </Button>
      <DatasetSectionHeader label="publisher" active={!!publisher} />
      {publisher && (
        <div>
          {publisher.url ? (
            <Link href={publisher.url}>{publisher.name}</Link>
          ) : (
            <Typography>{publisher.name}</Typography>
          )}
          {publisher.description && (
            <Typography level="body-sm">{publisher.description}</Typography>
          )}
          {publisher.country && (
            <Typography level="body-sm">{publisher.country}</Typography>
          )}
        </div>
      )}
      <DatasetSectionHeader label="maintainer" active={!!maintainer} />
      {maintainer && (
        <div>
          {maintainer.url ? (
            <Link href={maintainer.url}>{maintainer.name}</Link>
          ) : (
            <Typography>{maintainer.name}</Typography>
          )}
          {maintainer.description && (
            <Typography level="body-sm">{maintainer.description}</Typography>
          )}
          {maintainer.country && (
            <Typography level="body-sm">{maintainer.country}</Typography>
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
        spacing={3}
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
