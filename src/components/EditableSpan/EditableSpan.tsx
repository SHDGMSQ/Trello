import {EditableSpanPropsType} from "@/components/EditableSpan/types";
import {memo} from "react";
import {TextField} from "@mui/material";
import {useEditableSpan} from "@/components/EditableSpan/hooks/useEditableSpan";


export const EditableSpan = memo((props: EditableSpanPropsType) => {
  const {isEditMode, offEditMode, onEditMode, onChangeTitleValue, inputTitle, title} = useEditableSpan(props);


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
