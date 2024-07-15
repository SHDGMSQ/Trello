import * as React from "react";
import {memo, useCallback} from "react";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IconButton} from "@mui/material";
import Popover from "@mui/material/Popover";
import {ListPopupPropsType} from "@/components/TodolistPopup/types";
import {useTodolistPopup} from "@/components/TodolistPopup/hooks/useTodolistPopup";
import {DeleteModal} from "@/components/DeletePopup/DeleteModal";
import {ModalTitle} from "@/components/ModalTitle/ModalTitle";

//styles
const listMenuIconStyle = {
  "&.MuiButtonBase-root": {
    width: "32px",
    height: "32px",
    borderRadius: "8px"
  }
};
const listIconStyle = {
  width: "16px",
  height: "16px"
};
const popoverStyles = {
  "& .MuiPaper-root": {
    width: "250px",
    fontSize: "14px",
    borderRadius: "8px",
    marginTop: "8px"
  },
};
const addCardMenuStyles = {
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
};
const deleteListMenuStyles = {
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "red"
};

export const TodolistPopup = memo((props: ListPopupPropsType) => {

  const {anchorEl, todoId, id, handleClose, handleClick, open, entityStatus, onDeleteMenuHandler, showDeleteModal, setShowModal, removeTodolist} = useTodolistPopup(props);

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={listMenuIconStyle}
        onClick={handleClick}
        disabled={entityStatus === "loading"}
      >
        <MoreHorizIcon sx={listIconStyle}/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={popoverStyles}
      >
        <ModalTitle title="List actions" handleClose={handleClose}/>
        <MenuItem onClick={() => {
        }} sx={addCardMenuStyles}>Add card</MenuItem>
        <MenuItem onClick={onDeleteMenuHandler} sx={deleteListMenuStyles}>Delete this list</MenuItem>
      </Popover>
      <DeleteModal showModal={showDeleteModal} setShowModal={setShowModal} todoId={todoId} removeTodolist={removeTodolist}/>
    </div>
  );
});