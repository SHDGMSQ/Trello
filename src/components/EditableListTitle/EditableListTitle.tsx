import {memo} from "react";
import {TextField} from "@mui/material";
import {EditableListPropsType} from "@/components/EditableListTitle/types";
import {useEditableList} from "@/components/EditableListTitle/hooks/useEditableList";
import styles from "./EditableListTitle.module.scss";

export const EditableListTitle = memo((props: EditableListPropsType) => {

  const {title, textFieldStyleObj, onEditMode, offEditMode, headerStyleObj, onChangeTitleValue, inputTitle} = useEditableList(props);

  return (
    <div className={styles.container}>
      <h2
        className={styles.header} onClick={onEditMode} style={headerStyleObj}>{title}</h2>
      <TextField
        onChange={onChangeTitleValue}
        value={inputTitle}
        sx={textFieldStyleObj}
        inputRef={input => input && input.focus()}
        onBlur={offEditMode}
      />
    </div>
  );
});
