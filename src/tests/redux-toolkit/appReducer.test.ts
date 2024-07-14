import {AppStateType} from "@/app/types";
import {
  appReducer,
  setAppErrorAC,
  setAppStatusAC,
  setIsInitializedAppTC
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
  test("setAppStatusAC: correct app status value should be set", () => {
    const result = appReducer(startState, setAppStatusAC({status: "loading"}));
    expect(result.status).toBe("loading");
    expect(result.status).not.toBe("idle");
  });
  test("setAppErrorAC: correct auth value should be set", () => {
    const result = appReducer(startState, setAppErrorAC({error: "Some error"}));
    expect(result.error).toBe("Some error");
    expect(result.error).not.toBe(null);
  });
  test("setAppIsInitializedAC: correct auth value should be set", () => {
    const result = appReducer(startState, setIsInitializedAppTC.fulfilled(undefined, undefined));
    expect(result.isInitialized).toBeTruthy();
  });
});