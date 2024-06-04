import { Suspense, useContext } from "react";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { CatalogContext } from "./CatalogContext";
import CatalogItem from "./CatalogItem";

export default function Catalog() {
  const populatedContext = useContext(CatalogContext);
  if (!populatedContext) {
    return null;
  }
  const { filteredItems } = populatedContext;

  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {filteredItems
          .sort((a, b) =>
            a.updatedAt && (!b.updatedAt || a.updatedAt > b.updatedAt) ? 1 : -1,
          )
          .map((d) => (
            <Grid key={d.name} xs={12} sm={6} md={12} lg={6}>
              <CatalogItem key={d.name} item={d} />
            </Grid>
          ))}
      </Grid>
      <Box padding="4rem 0 4rem" textAlign="center">
        <img src={`/static/icons/ok.svg`} />
        <Typography level="body-md">You have seen all datasets.</Typography>
        <Typography level="body-md">
          Keep checking – we add datasets regularly.
        </Typography>
      </Box>
    </Box>
  );
}
