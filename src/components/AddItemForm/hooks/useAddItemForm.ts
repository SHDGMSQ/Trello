import {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemFormPropsType} from "@/components/AddItemForm/types";

export const useAddItemForm = (props: AddItemFormPropsType) => {
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

  return {
    onKeyPressHandler,
    addItemHandler,
    onChangeInput,
    title,
    error,
  };
};