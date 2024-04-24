import type { ICatalog, IDataset } from "@investigativedata/ftmq";
import Grid from "@mui/joy/Grid";

import CatalogItem from "./CatalogItem";

export default function Catalog({ datasets }: { datasets: IDataset[] }) {
  return (
   <Grid container spacing={2} sx={{ flexGrow: 1 }}>
     {datasets?.map((d) => (
       <Grid key={d.name} xs={12} md={6}>
        <CatalogItem key={d.name} dataset={d} />
       </Grid>
     ))}
   </Grid>
  );
}
