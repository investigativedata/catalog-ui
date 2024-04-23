import "semantic-ui-flag/flag.css";
import Typography from '@mui/joy/Typography'
import Stack from "@mui/joy/Stack";

function CountryFlag({ iso }: { iso?: string }) {
  return iso ? <i className={`${iso.toLowerCase()} flag`}></i> : null;
}

export default function CountryLabel({ iso, label }: { iso: string | null, label?: string }) {
  if (!iso && !CountryLabel) {
    return null;
  }

  const countryLabel = label === 'eu' ? "European Union" : label;
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {!!iso && (
        <CountryFlag iso={iso.toLowerCase()} />
      )}
      {!!countryLabel && (
        <Typography level="body-sm">{countryLabel}</Typography>
      )}
    </Stack>
  )
}
