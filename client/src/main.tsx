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
import App from "./App.tsx";
import Users from "./features/Users/Users.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Logout from "./features/Logout.tsx";
import Channels from "./features/Channels/Channels.tsx";
import channelsLoader from "./features/Channels/loader.ts";
import ChannelContainer from "./features/Channel/ChannelContainer.tsx";
import ChannelRoom from "./features/Channel/ChannelRoom.tsx";
import ChannelInfo from "./features/Channel/ChannelInfo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/channels"} />,
      },
      {
        path: "channels",
        element: <Channels />,
        loader: channelsLoader,
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
