import {AppBar, Button, LinearProgress, Toolbar} from "@mui/material";
import {useApp} from "@/app/hooks/useApp";
import {ErrorSnackbar} from "@/components/ErrorSnackbar/ErrorSnackbar";
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "@/pages/TodolistsList/TodolistsList";
import {Login} from "@/pages/Login/Login";
import CircularProgress from "@mui/material/CircularProgress";

export const App = () => {
  const {appStatus, isInitialized, isLoggedIn, onClickLogOut} = useApp();

  if (!isInitialized) {
    return <div style={{position: "fixed", top: "30%", left: "50%"}}>
      <CircularProgress/>
    </div>;
  }

  return (
    <>
      <ErrorSnackbar/>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && <Button color="inherit" onClick={onClickLogOut}>Log out</Button>}
        </Toolbar>
      </AppBar>
      {appStatus === "loading" && <LinearProgress/>}
      <Routes>
        <Route path={"/"} element={<TodolistsList/>}/>
        <Route path={"/login"} element={<Login/>}/>
      </Routes>
    </>
  );
};



