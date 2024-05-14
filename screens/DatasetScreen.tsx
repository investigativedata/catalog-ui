"use client";

import { useState } from 'react';
import type { ICountryStats, IDataset, ISchema, ISchemataStats } from "@investigativedata/ftmq";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { Link } from "@mui/joy";
import Card from "@mui/joy/Card"

import DatasetProperty from "~/components/Dataset/DatasetProperty";
import DatasetLastUpdated from "~/components/Dataset/DatasetLastUpdated";
import CountryLabel from "~/components/CountryLabel";
import Count from "~/components/Count";
import CTADrawer from "~/components/CTADrawer";


const DatasetSectionHeader = ({ label, count }: { label: string, count?: number }) => {
  return (
    <Card size="sm" color="success" variant="soft" sx={{ borderRadius: 0, padding: "10px" }}>
      <Typography
        level="h5"
        endDecorator={count && <Count value={count} />}
        sx={{ textTransform: 'capitalize' }}
      >
        {label}
      </Typography>
    </Card>
  );
}

const DatasetMetadataMain = ({ dataset }: { dataset: IDataset }) => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <DatasetProperty label="entities" value={dataset.entity_count} type="number" />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="frequency" value={dataset.coverage?.frequency} type="frequency" />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="type" value={dataset.coverage?.frequency} />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="last updated" value={dataset.updated_at} type="date" />
          <DatasetLastUpdated datetime={dataset.updated_at} />
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
      {schemataMerged.length > 0 && (
        <>
          <DatasetSectionHeader label="entity types" active={!!schemataMerged.length} count={schemataMerged.length} />
          {schemataMerged.map((d: ISchema) => (
            <div key={d.name}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <Typography level="body-sm">{d.plural}</Typography>
                <Count value={d.count} />
              </Stack>
            </div>
          ))}
        </>
      )}
      {countriesMerged.length > 0 && (
        <>
          <DatasetSectionHeader label="countries" active={!!countriesMerged.length} count={countriesMerged.length} />
          {countriesMerged.map((country: ICountryStats) => (
            <div key={country.code}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <CountryLabel iso={country.code} label={country.label} />
                <Count value={country.count} />
              </Stack>
            </div>
          ))}
        </>
      )}
      
    </Stack>
  );
}

const DatasetMetadataSecondary = ({ dataset, openDrawer }: { dataset: IDataset, openDrawer: any }) => {
  const { publisher, maintainer } = dataset;

  return (
    <Stack spacing={2}>
      {publisher && (
        <>
          <DatasetSectionHeader label="publisher" active={!!publisher} />
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
        </>
      )}
      
      {maintainer && (
        <>
          <DatasetSectionHeader label="maintainer" />
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
        </>
      )}
      <div>
        <Button variant="outlined" size="md" onClick={openDrawer}>
          Use this data
        </Button>
      </div>
    </Stack>
  );
}


export default function DatasetScreen({ dataset }: { dataset: IDataset }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <Stack>
        <Typography level="h2">{dataset.title || dataset.name}</Typography>

        <Grid container spacing={6}>
          <Grid xs={12} sm={6} md={5}>
            <DatasetMetadataMain dataset={dataset} />
          </Grid>
          <Grid xs={12} sm={6} md={3.5}>
            <DatasetMetadataEntities dataset={dataset} />
          </Grid>
          <Grid xs={12} sm={6} md={3.5}>
            <DatasetMetadataSecondary dataset={dataset} openDrawer={() => setDrawerOpen(true)} />
          </Grid>
        </Grid>

        <code>
          <pre>{JSON.stringify(dataset, null, 2)}</pre>
        </code>
      </Stack>
      <CTADrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
    </>
  
  );
}
