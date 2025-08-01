// routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from '../Layout.jsx';

import Hero from "../Pages/Hero";
import Projects from "../Pages/Projects.jsx";
import About from "../Pages/About.jsx";
import Contact from "../Pages/Contact.jsx";
import NotFoundPage from "../Pages/Notfound.jsx";
// routes/router.jsx


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Parent layout
    children: [
      {
        index: true, // path: '/'
        element: <Hero />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        // Catch-all route for 404
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
