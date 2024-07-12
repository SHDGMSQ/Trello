import {FormikHelpers, useFormik} from "formik";
import {loginTC} from "@/store/redux-toolkit/reducers/authReducer";
import {FormValuesType} from "@/pages/Login/types";
import {useAppDispatch, useAppSelector} from "@/store/redux-toolkit/hooks/hooks";

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
          onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {

            const action = await dispatch(loginTC(values));

            if (loginTC.rejected.match(action) && action.payload.errors.length) {
              formikHelpers.setFieldError("email", action.payload.errors[0]);
            }

          }
        }
      )
    ;

    return {
      formik,
      isLoggedIn
    };
  }
;