import {AppStateType} from "@/app/types";
import {
  appReducer,
  setAppError,
  setAppStatus,
  setIsInitializedApp
} from "@/store/redux-toolkit/reducers/appReducer";

let startState: AppStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  }
})

describe("APP REDUCER TESTS", () => {
  test("setAppStatus: correct app status value should be set", () => {
    const result = appReducer(startState, setAppStatus({status: "loading"}));
    expect(result.status).toBe("loading");
    expect(result.status).not.toBe("idle");
  });
  test("setAppError: correct auth value should be set", () => {
    const result = appReducer(startState, setAppError({error: "Some error"}));
    expect(result.error).toBe("Some error");
    expect(result.error).not.toBe(null);
  });
  test("setAppIsInitializedAC: correct auth value should be set", () => {
    const result = appReducer(startState, setIsInitializedApp.fulfilled(undefined, undefined));
    expect(result.isInitialized).toBeTruthy();
  });
});