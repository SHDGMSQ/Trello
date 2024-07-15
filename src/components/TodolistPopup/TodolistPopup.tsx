import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TodolistPopup.module.scss";
import Popover from "@mui/material/Popover";
import {ListPopupPropsType} from "@/components/TodolistPopup/types";
import {useTodolistPopup} from "@/components/TodolistPopup/hooks/useTodolistPopup";
import {memo} from "react";
import {DeletePopup} from "@/components/DeletePopup/DeletePopup";


export const TodolistPopup = memo((props: ListPopupPropsType) => {

  const {anchorEl, id, addCardMenuStyles, listMenuIconStyle, deleteListMenuStyles, closeButtonStyles, popoverStyles, handleClose, handleClick, listIconStyle, closeIconStyles, open, entityStatus} = useTodolistPopup(props);

  const [showDeletePopup, setShowDeletePopup] = React.useState(false);


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
        <div className={styles.header}>
          <h2>List actions</h2>
          <IconButton sx={closeButtonStyles}>
            <CloseIcon sx={closeIconStyles} onClick={handleClose}/>
          </IconButton>
        </div>
        <MenuItem onClick={() => {
        }} sx={addCardMenuStyles}>Add card</MenuItem>
        <MenuItem onClick={() => {
        }} sx={deleteListMenuStyles}>Delete this list</MenuItem>
      </Popover>
      <DeletePopup entityStatus={entityStatus}/>
    </div>
  );
});