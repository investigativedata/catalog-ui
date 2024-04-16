import type { ICatalog } from "@investigativedata/ftmq";
import Grid from "@mui/joy/Grid";

import Dataset from "./Dataset";

export default function Catalog({ catalog }: { catalog: ICatalog }) {
  return (
   <Grid container spacing={2} sx={{ flexGrow: 1 }}>
     {catalog.datasets?.map((d) => (
       <Grid xs={12} md={6}>
        <Dataset key={d.name} dataset={d} />
       </Grid>
     ))}
   </Grid>
  );
}
