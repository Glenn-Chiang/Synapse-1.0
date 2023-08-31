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
import App from "./App.tsx";
import ChatRoom from "./features/Chat/ChatRoom.tsx";
import Users from "./features/Users/Users.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import chatsLoader from "./features/Chats/loader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/chats"} />,
      },
      {
        path: "chats",
        element: <Chats />,
        loader: chatsLoader,
        children: [
          {
            path: ":chatId",
            element: <ChatRoom />,
          },
        ]
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
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
