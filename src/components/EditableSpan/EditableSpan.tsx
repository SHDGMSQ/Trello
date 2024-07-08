import {EditableSpanPropsType} from "@/components/EditableSpan/types";
import {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";


export const EditableSpan = memo((props: EditableSpanPropsType) => {
  const {title, changeTitle} = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");

  const onEditMode = () => {
    setIsEditMode(true);
    setInputTitle(title);
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

  return (
    <span>
      {isEditMode
        ?
        <TextField
          type="text"
          onChange={onChangeTitleValue}
          value={inputTitle}
          onBlur={offEditMode}
          autoFocus
          variant="standard"
          size="small"
        />
        : <span onDoubleClick={onEditMode}>{title}</span>
      }
    </span>
  );
});
