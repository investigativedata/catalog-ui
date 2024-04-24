import Typography from "@mui/joy/Typography";
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

type DatasetLastUpdatedProps = {
  datetime: string
}

export default function DatasetLastUpdated({ datetime }: DatasetLastUpdatedProps) {
  const fromNow = dayjs(datetime).fromNow()
  return (
   <Typography level="body-md">{fromNow}</Typography>
  )
}