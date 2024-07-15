import {EditableListPropsType} from "@/components/EditableListTitle/types";
import {ChangeEvent, useState} from "react";

export const useEditableList = (props: EditableListPropsType) => {
  const {title, changeTitle, disabled = false} = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");

  const onEditMode = () => {
    if (!disabled) {
      setIsEditMode(true);
      setInputTitle(title);
    }
  };

  const offEditMode = () => {
    setIsEditMode(false);
    if (inputTitle.trim() && inputTitle.trim() !== title) {
      changeTitle(inputTitle);
    }
  };

  const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value);
  };

  const headerStyleObj = {
    display: isEditMode ? "none": "block"
  }

  const textFieldStyleObj = {
    position: isEditMode ? "static" : "absolute",
    zIndex: isEditMode ? 0 : -1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxSizing: "border-box",
    minHeight: "20px",
    margin: 0,
    overflow: "hidden",
    borderRadius: "4px",
    opacity: isEditMode ? 1 : 0,
    background: "transparent",
    boxShadow: "none",
    fontWeight: 600,
    resize: "none",
    overflowWrap: "break-word",
    backgroundColor: "#fff",
    width: "100%",
    "& .MuiInputBase-root": {
      height: "32px",
      padding: 0,
      fontSize: "14px",
      borderRadius: "8px"
    }
  }

  return {
    title,
    textFieldStyleObj,
    headerStyleObj,
    onEditMode,
    offEditMode,
    onChangeTitleValue,
    inputTitle
  }
}