import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryProvider } from "./libs/QueryProvider.jsx";
import Products from "./Components/Paginated.jsx";
import Parallel from "./Components/Parallel.jsx";
import Optimistic from "./Components/Optimistic.jsx";
import Dependant from "./Components/Dependant.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/paginated",
    element: <Products />,
  },
  {
    path: "/parallel",
    element: <Parallel />,
  },
  {
    path: "/optimistic",
    element: <Optimistic />,
  },
  {
    path: "/dependant",
    element: <Dependant />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>
);
