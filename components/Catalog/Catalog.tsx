import { useContext } from "react";
import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import iconOkHand from "~/assets/icons/ok.svg";
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
      <Box
        padding="4rem 0 4rem"
        textAlign="center"
        display="flex"
        flexDirection="column"
      >
        <AspectRatio
          ratio="1/1"
          variant="plain"
          sx={{ width: "50%", alignSelf: "center" }}
        >
          <Image
            fill={true}
            src={iconOkHand}
            alt="ok hand icon"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </AspectRatio>
        <Typography level="body-md">You have seen all datasets.</Typography>
        <Typography level="body-md">
          Keep checking – we add datasets regularly.
        </Typography>
      </Box>
    </Box>
  );
}
