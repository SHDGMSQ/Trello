import {memo} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useErrorSnackbar} from "@/components/ErrorSnackbar/hooks/useErrorSnackbar";

export const ErrorSnackbar = memo(() => {

  const {error, handleClose} = useErrorSnackbar();

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{width: "100%"}}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
});