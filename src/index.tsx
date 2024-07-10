import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {App} from "@/app/App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("App not found");
}

const router = createBrowserRouter([
  {
    path: "*",
    element: <App/>
  }
]);

const container = createRoot(root);

container.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);