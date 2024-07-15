import React from "react";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ModalTitle.module.scss"
import {ModalTitlePropsType} from "@/components/ModalTitle/types";

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

export const ModalTitle = (props: ModalTitlePropsType) => {
  const {title, handleClose} = props;

  return (
    <div className={styles.header}>
      <h2>{title}</h2>
      <IconButton sx={closeButtonStyles} onClick={handleClose}>
        <CloseIcon sx={closeIconStyles} />
      </IconButton>
    </div>
  );
};