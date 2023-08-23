import React from "react";
import ReactDOM from "react-dom/client";
import Chats from "./views/Chats.tsx";
import Register from "./views/Register.tsx";
import Login from "./views/Login.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./views/Root.tsx";
import Channels from "./views/Channels.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/chats"} />,
      },
      {
        path: "chats",
        element: <Chats />,
        children: [
          {
            path: ":chatId",
          },
        ],
      },
      {
        path: "channels",
        element: <Channels />,
        children: [
          {
            path: ":channelId",
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
