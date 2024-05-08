import Typography from "@mui/joy/Typography";
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
const updateLocale = require('dayjs/plugin/updateLocale')

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

const TODAY = "TODAY";

dayjs.updateLocale('en', {
  relativeTime: {
    future: "%s",
    past: "%s",
    s: TODAY,
    m: TODAY,
    mm: TODAY,
    h: TODAY,
    hh: TODAY,
    d: "a day ago",
    dd: "%d days ago",
    M: "a month ago",
    MM: "%d months ago",
    y: "a year ago",
    yy: "%d years ago"
  }
})

type DatasetLastUpdatedProps = {
  datetime: string,
  onlyShowToday?: boolean,
  level?: string
}

export default function DatasetLastUpdated({ datetime, onlyShowToday, level }: DatasetLastUpdatedProps) {
  const fromNow = dayjs(datetime).fromNow();

  if (!onlyShowToday || (onlyShowToday && fromNow === TODAY)) {
    return (
      <Typography
        level={level || "body-sm"}
        sx={theme => ({
          color: `${theme.vars.palette.success[600]} !important`,
          fontWeight: 700,
          lineHeight: "130%",
          letterSpacing: "0.2px"
        })}
      >
        {fromNow}
      </Typography>
    )
  }

  return null;
}