"use client";

import Container from "@mui/joy/Container";

export default function ContentWrapper({ children }: React.PropsWithChildren) {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 10, fontSize: "70%" }}>
      {children}
    </Container>
  );
}
