import { ReactNode, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { Theme } from "@mui/joy";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Count from "~/components/Count";

const SHOWN_ITEM_CUTOFF = 5;

type DatasetSectionItemsProps = {
  items: any[];
  renderLabel: (item: any) => ReactNode;
  showAllByDefault?: boolean;
};

const DatasetSectionItems = ({
  items,
  renderLabel,
  showAllByDefault = false,
}: DatasetSectionItemsProps) => {
  const [showAll, setShowAll] = useState(showAllByDefault);

  const itemStyles = (theme: Theme) => ({
    borderBottom: `1px dotted ${theme.vars.palette.common.black}`,
    margin: "0 !important",
    padding: "8px 0",
  });

  const displayShowAllButton = items.length > SHOWN_ITEM_CUTOFF;

  const shownItems = showAll ? items : items.slice(0, SHOWN_ITEM_CUTOFF);

  return (
    <>
      {shownItems.map((item) => (
        <Box key={item.label} sx={itemStyles}>
          <Stack direction="row" justifyContent="space-between" spacing={3}>
            {renderLabel(item)}
            <Count value={item.count} />
          </Stack>
        </Box>
      ))}
      {displayShowAllButton && (
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={
            showAll ? (
              <RemoveIcon
                sx={(theme) => ({ color: theme.palette.common.black })}
              />
            ) : (
              <AddIcon
                sx={(theme) => ({ color: theme.palette.common.black })}
              />
            )
          }
          onClick={() => setShowAll(!showAll)}
          sx={{
            background: "none !important",
            boxShadow: "none !important",
            justifyContent: "start",
            width: "fit-content",
            margin: "0 !important",
            padding: "8px 2px",
            fontWeight: "normal",
            textDecoration: "underline",
          }}
        >
          {showAll ? "Show less" : "Show all"}
        </Button>
      )}
    </>
  );
};

export default DatasetSectionItems;
