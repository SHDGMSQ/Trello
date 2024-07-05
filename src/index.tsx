import {createRoot} from "react-dom/client";
import {App} from "@/components/app/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

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
  <RouterProvider router={router} />
);