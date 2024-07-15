import {ListPopupPropsType} from "@/components/TodolistPopup/types";
import * as React from "react";

export const useTodolistPopup = (props: ListPopupPropsType) => {
  const {entityStatus} = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const closeButtonStyles = {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    gridColumn: 3,
    gridRow: 1,
    color: "#626f86",
  };

  const closeIconStyles = {
    width: "16px",
    height: "16px",
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return {
    entityStatus, open, listMenuIconStyle, handleClick, listIconStyle, id, anchorEl, handleClose, popoverStyles, closeButtonStyles, closeIconStyles, addCardMenuStyles, deleteListMenuStyles
  }
}