import {BuildOptions} from "./types/types";
import {Configuration} from "webpack";

export const buildResolvers = (options: BuildOptions): Configuration["resolve"] => {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": options.paths.src,
    }
  };
};