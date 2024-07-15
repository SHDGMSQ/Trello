import React from "react";
import {useTodolistPopup} from "@/components/TodolistPopup/hooks/useTodolistPopup";
import {IconButton} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import styles from "@/components/TodolistPopup/TodolistPopup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import {ListPopupPropsType} from "@/components/TodolistPopup/types";

export const DeletePopup = (props: ListPopupPropsType) => {
  const {anchorEl, id, addCardMenuStyles, listMenuIconStyle, deleteListMenuStyles, closeButtonStyles, popoverStyles, handleClose, handleClick, listIconStyle, closeIconStyles, open, entityStatus} = useTodolistPopup(props);



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
        <p style={{padding: "0 12px 12px 12px"}}>
          All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.
        </p>
      </Popover>
    </div>
  );
};
