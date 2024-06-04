import { ReactNode } from "react";
import type { Theme } from "@mui/joy";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DatasetPropertyValue from "./DatasetPropertyValue";

type DatasetPropertyProps = {
  label: string;
  labelEndDecorator?: ReactNode | null;
  value: string | number | null | undefined;
  type?: string;
  href?: string | null;
};

export default function DatasetProperty({
  label,
  labelEndDecorator,
  value,
  type,
  href,
}: DatasetPropertyProps) {
  const capitalize = type === "string" || type === "frequency";

  return (
    <Stack gap={0.5}>
      <Typography
        level="body-xs"
        endDecorator={labelEndDecorator}
        sx={(theme) => ({
          textTransform: "uppercase",
          fontSize: "0.65rem",
          color: theme.vars.palette.common.black,
          fontWeight: "400",
          lineHeight: "130%",
          letterSpacing: "0.2px",
          alignItems: "flex-start",
        })}
      >
        {label}
      </Typography>
      <DatasetPropertyValue
        value={value}
        type={type}
        href={href}
        style={(theme: Theme) => ({
          fontWeight: !href ? "bold" : "400",
          color: theme.vars.palette.common.black,
          lineHeight: "130%",
          textTransform: capitalize ? "capitalize" : "none",
        })}
      />
    </Stack>
  );
}
