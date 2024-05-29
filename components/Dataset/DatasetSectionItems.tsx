import { ReactNode, useState } from 'react';
import Stack from "@mui/joy/Stack";
import type { Theme } from "@mui/joy";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';

import Count from "~/components/Count";

type DatasetSectionItemsProps = {
  items: any[],
  renderLabel: (item: any) => ReactNode
  showAllByDefault: boolean
}

const DatasetSectionItems = ({ items, renderLabel, showAllByDefault }: DatasetSectionItemsProps) => {
 const [showAll, setShowAll] = useState(showAllByDefault)

  const itemStyles = (theme: Theme) => ({ 
    borderBottom: `1px dotted ${theme.vars.palette.common.black}`, 
    margin: "0 !important", 
    padding: "8px 0"
  })

  const shownItems = showAll ? items : items.slice(0, 5)

  const displayShowAllButton = items.length > shownItems.length

  return (
    <>
     {shownItems.map((item) => (
       <Box key={item.key} sx={itemStyles}>
         <Stack
           direction="row"
           justifyContent="space-between"
           spacing={3}
         >
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
         startDecorator={<Add sx={theme => ({ color: theme.palette.common.black })} />}
         onClick={() => setShowAll(true)}
         sx={{
           background: "none !important",
           boxShadow: "none !important",
           justifyContent: "start",
           width: "fit-content",
           margin: "0 !important",
           padding: "8px 2px",
           fontWeight: "normal",
           textDecoration: "underline"
         }}
       >
         Show all
       </Button>
     )}
   </>
  );
}

export default DatasetSectionItems