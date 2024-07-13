import {AppStateType} from "@/app/types";
import {appReducer, setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from "@/store/redux/reducers/appReducer";

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
    const result = appReducer(startState, setAppStatusAC("loading"));
    expect(result.status).toBe("loading");
    expect(result.status).not.toBe("idle");
  });
  test("setAppErrorAC: correct auth value should be set", () => {
    const result = appReducer(startState, setAppErrorAC("Some error"));
    expect(result.error).toBe("Some error");
    expect(result.error).not.toBe(null);
  });
  test("setAppIsInitializedAC: correct auth value should be set", () => {
    const result = appReducer(startState, setAppIsInitializedAC(true));
    expect(result.isInitialized).toBeTruthy();
  });
});