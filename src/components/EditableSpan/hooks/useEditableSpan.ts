import {ChangeEvent, useState} from "react";
import {EditableSpanPropsType} from "@/components/EditableSpan/types";

export const useEditableSpan = (props: EditableSpanPropsType) => {
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
    if (inputTitle.trim()) {
      changeTitle(inputTitle);
    }
  };

  const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value);
  };

  return {
    onChangeTitleValue,
    offEditMode,
    onEditMode,
    inputTitle,
    isEditMode,
    title,
  };
};