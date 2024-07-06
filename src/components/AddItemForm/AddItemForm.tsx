import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {AddItemFormPropsType} from "@/components/AddItemForm/types";
import styles from "./AddItemForm.module.scss";

export const AddItemForm = memo((props: AddItemFormPropsType) => {
  const {addItem} = props;

  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    if (!title && !e.currentTarget.value.trim()) {
      return;
    } else {
      setTitle(e.currentTarget.value);
    }
  };

  const addItemHandler = () => {
    if (title === "") {
      setError("Field is required!");
    } else {
      addItem(title.trim());
      setTitle("");
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={onChangeInput}
        value={title}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addItemHandler}>+</button>
      <div className={`${error ? styles.error : styles.hiddenError}`}>{error}</div>
    </div>
  );
});
