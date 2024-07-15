import * as React from "react";
import {memo, useCallback} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {DeleteModalPropsType} from "@/components/DeletePopup/types";
import {ModalTitle} from "@/components/ModalTitle/ModalTitle";
import styles from "./DeletePopup.module.scss";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteModal} from "@/components/DeletePopup/hooks/useDeleteModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
};
const deleteButtonStyle = {
  width: "100%",
  backgroundColor: "red",
  color: "#fff",
  borderRadius: 0,
  border: "none",
  outline: "none",
  "&:hover": {
    backgroundColor: "#C9372C",
    border: "none"
  }
}

export const DeleteModal = memo((props: DeleteModalPropsType) => {
  const {showModal, handleClose, onRemoveTodolistHandler} = useDeleteModal(props);


  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalTitle title="Delete card?" handleClose={handleClose}/>
          <div className={styles.container}>
            <p className={styles.description}>
              All actions will be removed and you won’t be able to re-open the card. There is no undo.
            </p>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={deleteButtonStyle}
              onClick={onRemoveTodolistHandler}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
});