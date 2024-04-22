"use client";

import type { ICountryStats, IDataset, ISchema, ISchemataStats } from "@investigativedata/ftmq";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Link } from "@mui/joy";
import Card from "@mui/joy/Card"

import DatasetProperty from "~/components/Dataset/DatasetProperty";
import CountryLabel from "~/components/CountryLabel";

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
    <Card size="sm" color="success" variant="soft" sx={{ borderRadius: 0, padding: "10px" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={3}
      >
        <Typography level="h5" sx={{ textTransform: 'capitalize' }}>{label}</Typography>
        {count && <Chip variant="soft" color="neutral" size="sm">{count}</Chip>}
      </Stack>
    </Card>
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

  const countries = [...(things?.countries || []), ...(intervals?.countries || [])]

  const countriesMerged = Object.values(
      countries.reduce((acc, item) => {
        acc[item.code] = acc[item.code]
          ? { ...item, count: item.count + acc[item.code].count }
          : item;
        return acc;
      }, {})
    )
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
            <Chip variant="soft" color="neutral" size="sm">{d.count}</Chip>
          </Stack>
        </div>
      ))}
      <DatasetSectionHeader label="countries" active={true} />
      {countriesMerged.map((country: ICountryStats) => (
        <div key={country.code}>
          <CountryLabel iso={country.code} label={country.label} />
        </div>
      ))}
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
            <CountryLabel iso={publisher.country} label={publisher.country_label} />
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
            <CountryLabel iso={maintainer.country} label={maintainer.country_label} />
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
