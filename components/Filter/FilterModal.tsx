import { useState, Fragment } from 'react';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';


export type FilterModalProps = {
  filterCount: number,
  children: any
};

export default function FilterModal({ filterCount, children }: FilterModalProps ) {
  const [open, setOpen] = useState<boolean>(false);

  const filterIconPath = `/static/icons/${filterCount > 0 ? 'filter_filled' : 'filter'}.svg`

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)} sx={{ display: { xs: "block", md: "none" } }}>
        <img src={filterIconPath} style={{ width: "2rem", height: "2rem" }} />
      </IconButton>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <ModalDialog layout="fullscreen">
          <ModalClose />
          <Box
            sx={{
              overflow: "scroll",
              marginTop: "5rem",
            }}
          >
            {children}
            {/* <Button
              size="md"
              fullWidth={false}
              onClick={() => setOpen(false)}
              sx={{
                display: "inline-block",
                marginTop: "2rem",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)"
              }}
            >
              Apply {filterCount} filters
            </Button> */}
          </Box>
         
        </ModalDialog>
      </Modal>
    </Fragment>
  )
}
