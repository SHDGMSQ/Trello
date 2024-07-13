import {InitialAuthStateType} from "@/pages/Login/types";
import {authReducer, setIsLoggedInAC, setLogOutAC} from "@/store/redux/reducers/authReducer";


describe("AUTH REDUCER TESTS", () => {
  test("setIsLoggedInAC: correct auth value should be set", () => {
    const startState: InitialAuthStateType = {
      isLoggedIn: false
    };

    const result = authReducer(startState, setIsLoggedInAC(true));

    expect(result.isLoggedIn).toBeTruthy();
  });
  test("setLogOutAC: correct auth value should be set", () => {
    const startState: InitialAuthStateType = {
      isLoggedIn: true
    };

    const result = authReducer(startState, setLogOutAC(false));

    expect(result.isLoggedIn).toBeFalsy();
  });
});