import {BuildMode, BuildPaths} from "./config/build/types/types";
import {buildWebpack} from "./config/build/buildWebpack";
import webpack from "webpack";
import path from "path";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    src: path.resolve(__dirname, "src")
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3000,
    paths,
    analyzer: env.analyzer,
  });

  return config;
}