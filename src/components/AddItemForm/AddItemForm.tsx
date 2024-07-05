import {ChangeEvent, memo, useState} from "react";
import {AddItemFormPropsType} from "@/components/AddItemForm/types";
import styles from "./AddItemForm.module.scss";

//todo доработать компонент, валидация и т.п.
export const AddItemForm =memo((props: AddItemFormPropsType) => {
  const {addItem} = props;

  const [value, setValue] = useState<string>("");

  console.log("render");

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onClickButtonHandler = () => {
    addItem(value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={onChangeValueHandler}
        value={value}
      />
      <button onClick={onClickButtonHandler}>+</button>
    </div>
  );
}) ;
