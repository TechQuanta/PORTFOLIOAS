// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "./components/ThemeContext.jsx";
import ThemeWrapper from "./components/ThemeWrapper.jsx";
import { RouterProvider } from "react-router-dom";
import routes from './router/routes.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeWrapper>
        <RouterProvider router={routes} />
      </ThemeWrapper>
    </ThemeProvider>
  </React.StrictMode>
);
