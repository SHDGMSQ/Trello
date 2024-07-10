export type RequestAppStatusType = "idle" | "loading" | "succeeded" | "failed";

export type AppStateType = {
  status: RequestAppStatusType;
  error: string | null;
  isInitialized: boolean,
}