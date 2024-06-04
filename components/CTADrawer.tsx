import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

const DrawerContentItem = ({ children }: React.PropsWithChildren) => (
  <Typography
    level="body-md"
    sx={{
      paddingBottom: "2rem",
      fontWeight: "500",
    }}
  >
    {children}
  </Typography>
);

export type TCTADrawer = {
  open: boolean;
  onClose: () => void;
};

export default function CTADrawer({ open, onClose }: TCTADrawer) {
  return (
    <Drawer
      anchor="right"
      color="warning"
      variant="soft"
      open={open}
      onClose={onClose}
      slotProps={{
        content: {
          sx: (theme) => ({
            backgroundColor: theme.vars.palette.common.white,
          }),
        },
      }}
    >
      <ModalClose />
      <Stack
        sx={{
          padding: "3rem 3rem",
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <DrawerContentItem>
          Are you interest to use this dataset in your next investigation?
        </DrawerContentItem>
        <DrawerContentItem>
          We can provide you with a no-worries-all-in service to manage all your
          research data.
        </DrawerContentItem>
        <DrawerContentItem>Got curious?</DrawerContentItem>
        {/* TODO: add CTA destination link */}
        <Button
          variant="outlined"
          size="md"
          component="a"
          href=""
          sx={{ width: "fit-content" }}
        >
          Get in touch
        </Button>
        <img
          width="50%"
          src={`/static/icons/ok.svg`}
          style={{
            transform: "translateX(100%)",
          }}
        />
      </Stack>
    </Drawer>
  );
}
