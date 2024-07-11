import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "@/store/redux/hooks/hooks";
import {loginTC} from "@/store/redux-toolkit/reducers/authReducer";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: { email?: string, password?: string, rememberMe?: boolean } = {};
      if (!values.email) {
        errors.email = "Email is Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is Required";
      } else if (values.password.length <= 2) {
        errors.password = "Must be 3 characters or more symbols in password";
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values));
    },
  });

  return {
    formik,
    isLoggedIn
  };
};