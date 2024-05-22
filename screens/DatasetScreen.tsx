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
import Tags from '~/components/Tags';


const DatasetSectionHeader = ({ label, count }: { label: string, count?: number }) => {
  return (
    <Card size="sm" color="success" variant="soft" sx={{ borderRadius: 0, padding: "10px", marginBottom: "24px !important" }}>
      <Typography
        level="h5"
        sx={{ textTransform: 'capitalize', fontWeight: "bold" }}
      >
        {label}
        {!!count && <span style={{ fontWeight: "normal" }}> ({count})</span>}
      </Typography>
    </Card>
  );
}

const DatasetMetadataMain = ({ dataset }: { dataset: IDataset }) => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={2} sx={{ marginLeft: "-8px !important" }}>
        <Grid xs={6}>
          <DatasetProperty label="entities" value={dataset.entity_count} type="number" />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="category" value={dataset.category || "Other"} />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="frequency" value={dataset.coverage?.frequency} type="frequency" />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="type" value={dataset.coverage?.frequency} />
        </Grid>
        <Grid xs={6}>
          <DatasetProperty label="last updated" value={dataset.updated_at} type="date" />
          <Box sx={{ paddingTop: "4px" }}>
            <DatasetLastUpdated datetime={dataset.updated_at} />
          </Box>
        </Grid>
      </Grid>
      <Typography level="body-md">{dataset.summary}</Typography>
      <DatasetProperty label="slug" value={dataset.name} />
    </Stack>
  );
}

const DatasetMetadataEntities = ({ dataset }: { dataset: IDataset }) => {
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

  const itemStyles = theme => ({ 
    borderBottom: `1px dotted ${theme.vars.palette.common.black}`, 
    margin: "0 !important", 
    padding: "8px 0"
  })

  return (
    <Stack spacing={4}>
      {schemataMerged.length > 0 && (
        <>
          <DatasetSectionHeader label="entity types" active={!!schemataMerged.length} count={schemataMerged.length} />
          {schemataMerged.map((d: ISchema) => (
            <Box key={d.name} sx={itemStyles}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <Typography level="body-sm" sx={theme => ({ color: theme.vars.palette.common.black })}>{d.plural}</Typography>
                <Count value={d.count} />
              </Stack>
            </Box>
          ))}
        </>
      )}
      {countriesMerged.length > 0 && (
        <>
          <DatasetSectionHeader label="countries" active={!!countriesMerged.length} count={countriesMerged.length} />
          {countriesMerged.map((country: ICountryStats) => (
            <Box key={country.code} sx={itemStyles}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <CountryLabel iso={country.code} label={country.label} />
                <Count value={country.count} />
              </Stack>
            </Box>
          ))}
        </>
      )}
      
    </Stack>
  );
}

const DatasetMetadataSecondary = ({ dataset, openDrawer }: { dataset: IDataset, openDrawer: any }) => {
  const { publisher, maintainer } = dataset;

  return (
    <Stack spacing={3}>
      {publisher && (
        <>
          <DatasetSectionHeader label="publisher" active={!!publisher} />
          {publisher.url ? (
            <Link href={publisher.url} style={{ marginTop: "0" }}>{publisher.name}</Link>
          ) : (
            <Typography>{publisher.name}</Typography>
          )}
          {publisher.description && (
            <Typography level="body-sm" sx={theme => ({ color: theme.vars.palette.common.black })}>{publisher.description}</Typography>
          )}
          {publisher.country && (
            <CountryLabel iso={publisher.country} label={publisher.country_label} />
          )}
        </>
      )}
      
      {maintainer && (
        <>
          <DatasetSectionHeader label="maintainer" />
          {maintainer.url ? (
            <Link href={maintainer.url} style={{ marginTop: "0" }}>{maintainer.name}</Link>
          ) : (
            <Typography>{maintainer.name}</Typography>
          )}
          {maintainer.description && (
            <Typography level="body-sm" sx={theme => ({ color: theme.vars.palette.common.black })}>{maintainer.description}</Typography>
          )}
          {maintainer.country && (
            <CountryLabel iso={maintainer.country} label={maintainer.country_label} />
          )}
        </>
      )}
      <div>
        <Button
          size="md"
          color="neutral"
          variant="outlined"
          onClick={openDrawer}
          sx={{ backgroundColor: "transparent" }}
        >
          Use this data
        </Button>
      </div>
    </Stack>
  );
}


export default function DatasetScreen({ dataset }: { dataset: IDataset }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box sx={{ 
      padding: "5rem 0",
      maxWidth: "1400px",
      margin: "auto"
    }}>
      <Stack >
        <Box sx={{ paddingBottom: "2rem" }}>
          <Typography level="h2" sx={{ paddingBottom: "1rem" }}>{dataset.title || dataset.name}</Typography>
          {/* TODO: replace with values from metadata */}
          <Tags items={[ { label: 'Lorem Ipsum', value:"lorem_ipsum" }]} />
        </Box>
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
      </Stack>
      <CTADrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
    </Box>
  );
}
