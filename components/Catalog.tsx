import type { ICatalog } from "@investigativedata/ftmq";
import Grid from "@mui/joy/Grid";

import CatalogItem from "./CatalogItem";

export default function Catalog({ catalog }: { catalog: ICatalog }) {
  return (
   <Grid container spacing={2} sx={{ flexGrow: 1 }}>
     {catalog.datasets?.map((d) => (
       <Grid key={d.name} xs={12} md={6}>
        <CatalogItem key={d.name} dataset={d} />
       </Grid>
     ))}
   </Grid>
  );
}
