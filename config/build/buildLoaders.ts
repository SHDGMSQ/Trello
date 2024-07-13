import {BuildOptions} from "./types/types";
import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const {mode} = options;
  const isDev = mode === "development";
  const isProd = mode === "production";

  // const babelLoader = {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: [
  //             '@babel/preset-env',
  //             "@babel/preset-typescript",
  //             [
  //               "@babel/preset-react",
  //               {
  //                 runtime: isDev ? "automatic": "classic"
  //               }
  //             ]
  //
  //           ]
  //         }
  //       }
  //     }
  //   ]
  // }

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

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      cssLoaderWithModules
    ]
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

  return [tsLoader, scssLoader, assetLoader, svgLoader, cssLoader];
};