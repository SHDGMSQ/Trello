import {InitialAuthStateType} from "@/pages/Login/types";
import {authReducer, login, logout} from "@/store/redux-toolkit/reducers/authReducer";

describe("AUTH REDUCER TESTS", () => {
  test("setIsLoggedInAC: correct auth value should be set", () => {
    const startState: InitialAuthStateType = {
      isLoggedIn: false
    };

    const result = authReducer(startState, login.fulfilled(undefined, "requestId", undefined));

    expect(result.isLoggedIn).toBeTruthy();
  });
  test("setLogOutAC: correct auth value should be set", () => {
    const startState: InitialAuthStateType = {
      isLoggedIn: true
    };

    const result = authReducer(startState, logout.fulfilled(undefined, "requestId", undefined));

    expect(result.isLoggedIn).toBeFalsy();
  });
});