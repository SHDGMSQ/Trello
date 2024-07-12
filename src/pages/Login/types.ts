export type LoginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type InitialAuthStateType = {
  isLoggedIn: boolean;
}

export type FormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
}

type RejectValuesType = {
  errors: string[],
  fieldsErrors: string[]
}

export type RejectedLoginType = {
  rejectValue: RejectValuesType
}