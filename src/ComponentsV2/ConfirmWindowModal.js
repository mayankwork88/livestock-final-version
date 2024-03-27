import * as React from "react";
import { Modal, Box } from "@mui/material";
import {ConfirmWindowModalContent} from "./";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: { lg: "40%", md: "70%", sm: "90%" },
  p: 0,
  borderRadius: "5px",
};

const ConfirmWindowModal = ({ openModal, handleClose,showConfirmBtn, onConfirm}) => {

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <ConfirmWindowModalContent onCancel={handleClose} showConfirmBtn={showConfirmBtn} onConfirm={onConfirm}/>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmWindowModal;

