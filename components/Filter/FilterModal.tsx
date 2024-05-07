import { useState, Fragment } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';


export type TFilterModal = {
  
};

export default function FilterModal({ filterCount, children }): TFilterModal {
  const [open, setOpen] = useState<boolean>(false);

  const filterIconPath = `/static/icons/${filterCount > 0 ? 'filter_filled' : 'filter'}.svg`

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)} sx={{ pointerEvents: { xs: "all", md: "none" } }}>
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
              marginTop: "4rem"
            }}
          >
            {children}
          </Box>
          <Button size="md" fullWidth={false} onClick={() => setOpen(false)}>
            Apply {filterCount} filters
          </Button>
        </ModalDialog>
      </Modal>
    </Fragment>
  )
}
