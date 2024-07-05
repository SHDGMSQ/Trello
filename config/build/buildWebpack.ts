import {BuildOptions} from "./types/types";
import {Configuration} from "webpack";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";

export const buildWebpack = (options: BuildOptions): Configuration => {
  const {mode, paths} = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true
    },
    plugins: buildPlugins(options),
    devtool: isDev && "inline-source-map",
    devServer: isDev ? buildDevServer(options) : undefined
  };
};