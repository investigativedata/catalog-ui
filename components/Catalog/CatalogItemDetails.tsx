import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { IDatasetTransformed } from "~/util/transformFTM";
import CountryLabel from "../CountryLabel";
import DatasetLastUpdated from "../Dataset/DatasetLastUpdated";
import DatasetProperty from "../Dataset/DatasetProperty";
import Property from "../Property";

type CatalogItemDetailsProps = {
  item: IDatasetTransformed;
};

export default function CatalogItemDetails({ item }: CatalogItemDetailsProps) {
  const { publisher, maintainer } = item;
  return (
    <Box
      sx={(theme) => ({
        padding: "1rem",
        backgroundColor: theme.vars.palette.success[50],
      })}
    >
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={2} width="50%">
            <DatasetProperty
              label="entities"
              value={item.entityCount}
              type="number"
            />
            <DatasetProperty
              label="category"
              value={item.category}
              type="string"
            />
            <DatasetProperty
              label="frequency"
              value={item.frequency}
              type="string"
            />
          </Stack>
          <Stack spacing={2} width="50%">
            {publisher && (
              <DatasetProperty
                label="publisher"
                labelEndDecorator={<CountryLabel iso={publisher.country} />}
                value={publisher.name}
                href={publisher.url}
              />
            )}
            {maintainer && (
              <DatasetProperty
                label="maintainer"
                labelEndDecorator={<CountryLabel iso={maintainer.country} />}
                value={maintainer.name}
                href={maintainer.url}
              />
            )}
          </Stack>
        </Stack>
        <Typography
          level="body-xs"
          sx={(theme) => ({
            textTransform: "uppercase",
            fontSize: "0.65rem",
            color: theme.vars.palette.common.black,
            fontWeight: "400",
            lineHeight: "130%",
            letterSpacing: "0.2px",
          })}
        >
          <span>Last updated: </span>
          <Property value={item.updatedAt} type="date" />
          <span> </span>
          <DatasetLastUpdated
            datetime={item.updatedAt}
            onlyShowToday
            level="body-xs"
          />
        </Typography>
      </Stack>
    </Box>
  );
}
