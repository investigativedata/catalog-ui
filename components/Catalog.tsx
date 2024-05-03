import type { ICatalog, IDataset } from "@investigativedata/ftmq";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";


import CatalogItem from "./CatalogItem";

export default function Catalog({ datasets }: { datasets: IDataset[] }) {
  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {datasets?.map((d) => (
          <Grid key={d.name} xs={12} sm={6} md={12} lg={6}>
            <CatalogItem key={d.name} dataset={d} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
