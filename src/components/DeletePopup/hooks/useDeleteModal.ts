import {DeleteModalPropsType} from "@/components/DeletePopup/types";
import {useCallback} from "react";

export const useDeleteModal = (props: DeleteModalPropsType) => {
  const {showModal, setShowModal, todoId, removeTodolist} = props;
  const handleClose = () => setShowModal(false);

  const onRemoveTodolistHandler = useCallback(() => {
    removeTodolist(todoId);
    handleClose();
  }, [removeTodolist, todoId]);

  return {
    showModal, handleClose, onRemoveTodolistHandler,
  }
}