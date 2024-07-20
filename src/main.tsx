import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/Home/Home.page";
import { PublicationsPage } from "./pages/Publications/Publications.page";
import { ProjectsPage } from "./pages/Projects/Projects.page";
import { AboutPage } from "./pages/About/About.page";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/publications",
    element: <PublicationsPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
