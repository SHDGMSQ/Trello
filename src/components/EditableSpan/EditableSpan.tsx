import {EditableSpanPropsType} from "@/components/EditableSpan/types";
import {ChangeEvent, memo, useCallback, useState} from "react";


export const EditableSpan = memo((props: EditableSpanPropsType) => {
  const {title, changeTitle} = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");

  const onEditMode = () => {
    setIsEditMode(true);
    setInputTitle(title);
  };

  const offEditMode = useCallback (() => {
    setIsEditMode(false);
    changeTitle(inputTitle);
  }, [changeTitle, inputTitle]);

  const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value);
  };

  return (
    <span>
      {isEditMode
        ? <input
          value={inputTitle}
          onChange={onChangeTitleValue}
          onBlur={offEditMode}
          autoFocus
        />
        : <span onDoubleClick={onEditMode}>{title}</span>
      }
    </span>
  );
});
