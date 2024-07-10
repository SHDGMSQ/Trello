export type LoginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type InitialAuthStateType = {
  isLoggedIn: boolean;
}