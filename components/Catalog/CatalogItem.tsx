import Card from "@mui/joy/Card";
import CardContent from '@mui/joy/CardContent';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from '@mui/joy/Link';
import type { Theme } from "@mui/joy";

import DatasetPropertyValue from "../Dataset/DatasetPropertyValue";
import Tags from "../Tags";
import { capitalizeFirstLetter } from "~/util/util";
import { IDatasetTransformed } from "~/util/transformFTM";
import CatalogItemDetails from "./CatalogItemDetails";

type CatalogItemProps = {
  item: IDatasetTransformed;
};

export default function CatalogItem({ item }: CatalogItemProps) {
  return (
    <Card
      color="success"
      variant="soft"
      size="sm"
      sx={theme => ({
        padding: "0",
        border: `1px solid ${theme.vars.palette.success[600]}`,
        overflow: "hidden",
        transition: "box-shadow 200ms",
        "&:hover": { 
          boxShadow: `4px 4px 0 0 ${theme.vars.palette.success[600]}`
        },
      })}
    >
      <CardContent>
        <Stack sx={{ padding: "1rem" }} spacing="0.5rem">
          <DatasetPropertyValue
            displayValue={!!item.contentType ? capitalizeFirstLetter(item.contentType) : undefined}
            value={item.contentType}
            type="datatype"
            style={(theme: Theme) => ({ marginBottom: "0.5rem", color: theme.vars.palette.common.black })}
          />
          <Link
            overlay
            underline="none"
            href={`/${item.name}`}
            sx={{ textDecoration: "none" }}
          >
            <Typography level="body-md" sx={{ fontWeight: "bold" }}>
              {item.title || item.name}
            </Typography>
          </Link>
          <Tags items={item.tags} />
        </Stack>
        <CatalogItemDetails item={item} />
      </CardContent>
    </Card>
  );
}