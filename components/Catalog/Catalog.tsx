import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";

import CatalogItem from "./CatalogItem";
import { IDatasetTransformed } from "~/util/transformFTM";

export default function Catalog({ datasets }: { datasets: IDatasetTransformed[] }) {
  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {datasets.sort((a, b) => a.updatedAt && (a.updatedAt > b.updatedAt) ? 1 : -1)
          .map((d) => (
            <Grid key={d.name} xs={12} sm={6} md={12} lg={6}>
              <CatalogItem key={d.name} item={d} />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
}
