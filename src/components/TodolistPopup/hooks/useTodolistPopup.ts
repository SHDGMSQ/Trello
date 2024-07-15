import {ListPopupPropsType} from "@/components/TodolistPopup/types";
import * as React from "react";
import {useCallback} from "react";

export const useTodolistPopup = (props: ListPopupPropsType) => {
  const {entityStatus, todoId, removeTodolist} = props;

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback( () => {
    setAnchorEl(null);
  }, [])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const setShowModal = useCallback((value: boolean) => {
    setShowDeleteModal(value);
  }, [setShowDeleteModal]);

  const onDeleteMenuHandler = () => {
    setShowDeleteModal(true);
    handleClose();
  };

  return {
    entityStatus, open, handleClick, id, anchorEl, handleClose, todoId, setShowModal, onDeleteMenuHandler, showDeleteModal, removeTodolist
  }
}