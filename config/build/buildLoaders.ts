import {BuildOptions} from "./types/types";
import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const {mode} = options;
  const isDev = mode === "development";
  const isProd = mode === "production";

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  };


  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource"
  };


  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
      },
      esModule: false,
    }
  };


  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: isDev,
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),

      }
    },
    exclude: /node_modules/,
  };


  return [tsLoader, scssLoader, assetLoader, svgLoader];
};