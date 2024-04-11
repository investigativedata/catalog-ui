import type { ICatalog } from "@investigativedata/ftmq";
import Link from "next/link";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

export default function Catalog({ catalog }: { catalog: ICatalog }) {
  return (
   <List>
     {catalog.datasets?.map((d) => (
       <ListItem key={d.name}>
         <Link href={`/${d.name}`}>{d.title || d.name}</Link>
       </ListItem>
     ))}
   </List>
  );
}
