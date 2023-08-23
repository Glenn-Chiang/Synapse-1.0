import React from "react";
import ReactDOM from "react-dom/client";
import Chats from "./features/Chats/Chats.tsx";
import Register from "./features/Register.tsx";
import Login from "./features/Login.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./layouts/Root.tsx";
import Channels from "./features/Channels/Channels.tsx";
import ChatRoom from "./features/Chat/Chat.tsx";

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
      },
      {
        path: "chats/:chatId",
        element: <ChatRoom />,
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
