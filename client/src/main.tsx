import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./features/Register.tsx";
import Login from "./features/Login.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./features/App/App.tsx";
import Users from "./features/Users/Users.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Logout from "./features/Logout.tsx";
import Channels from "./features/Channels/Channels.tsx";
import ChannelContainer from "./features/Channel/ChannelContainer.tsx";
import ChannelRoom from "./features/Channel/ChannelRoom.tsx";
import ChannelInfo from "./features/Channel/ChannelInfo.tsx";
import Explorer from "./features/Explorer/Explorer.tsx";
import appLoader from "./features/App/loader.ts";
import Chats from "./features/Chats/Chats.tsx";
import ChatContainer from "./features/Chat/ChatContainer.tsx";
import ChatRoom from "./features/Chat/ChatRoom.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    children: [
      {
        path: "/",
        element: <Navigate to={"channels"} />,
      },
      {
        path: "explore",
        element: <Explorer/>
      },
      {
        path: "channels",
        element: <Channels />,
        children: [
          {
            path: ":channelId",
            element: <ChannelContainer />,
            children: [
              {
                path: "",
                element: <ChannelRoom />,
              },
              {
                path: "info",
                element: <ChannelInfo />,
              },
            ],
          },
        ],
      },
      {
        path: "Chats",
        element: <Chats />,
        children: [
          {
            path: ":userId",
            element: <ChatContainer />,
            children: [
              {
                path: "",
                element: <ChatRoom />,
              },
            ],
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
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
  {
    path: "/logout",
    element: <Logout />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
