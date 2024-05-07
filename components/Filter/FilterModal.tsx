import { useState, Fragment } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';


export type TFilterModal = {
  
};

export default function FilterModal({ filtersActive, children }): TFilterModal {
  const [open, setOpen] = useState<boolean>(false);

  const filterIconPath = `/static/icons/${filtersActive ? 'filter_filled' : 'filter'}.svg`

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
          {children}
        </ModalDialog>
      </Modal>
    </Fragment>
  )
}
