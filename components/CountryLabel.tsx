import "semantic-ui-flag/flag.css";
import Typography from '@mui/joy/Typography'

export function CountryFlag({ iso }: { iso?: string }) {
  return iso ? <i className={`${iso.toLowerCase()} flag`}></i> : null;
}

export default function CountryLabel({ iso, label }: { iso?: string | null, label?: string | null }) {
  if (!iso) {
    return null;
  }

  const countryLabel = label === 'eu' ? "European Union" : label;
  return (
    <Typography
      level="body-sm"
      sx={theme => ({ color: theme.vars.palette.common.black })}
      startDecorator={<CountryFlag iso={iso.toLowerCase()} />}
    >
      {countryLabel}
    </Typography>
  )
}
