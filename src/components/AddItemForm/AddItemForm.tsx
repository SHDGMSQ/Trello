import {memo} from "react";
import {AddItemFormPropsType} from "@/components/AddItemForm/types";
import styles from "./AddItemForm.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {IconButton, TextField} from "@mui/material";
import {useAddItemForm} from "@/components/AddItemForm/hooks/useAddItemForm";

export const AddItemForm = memo((props: AddItemFormPropsType) => {
  const {title, error, onChangeInput, addItemHandler, onKeyPressHandler} = useAddItemForm(props);

  return (
    <div className={styles.container}>
      <TextField
        type="text"
        onChange={onChangeInput}
        value={title}
        onKeyPress={onKeyPressHandler}
        variant="outlined"
        label="Type value"
        size="small"
        error={!!error}
        helperText={error}
      />
      <IconButton aria-label="delete" color="primary" onClick={addItemHandler}>
        <AddCircleOutlineIcon/>
      </IconButton>
    </div>
  );
});
