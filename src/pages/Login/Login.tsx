import {Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useLogin} from "@/pages/Login/hooks/useLogin";
import {Navigate} from "react-router-dom";

export const Login = () => {
  const {formik, isLoggedIn} = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"}/>;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>To log in get registered
                <a href={"https://social-network.samuraijs.com/"}
                   target={"_blank"}> here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                {...formik.getFieldProps("email")}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.email &&
                formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                variant="standard"
                {...formik.getFieldProps("password")}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.password &&
                formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
              <FormControlLabel label={"Remember me"} control={
                <Checkbox
                  name="rememberMe"
                  color="success"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                />}/>
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};