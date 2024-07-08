import {createRoot} from "react-dom/client";
import {App} from "@/app/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/store/store";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: []
  }
]);

container.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);