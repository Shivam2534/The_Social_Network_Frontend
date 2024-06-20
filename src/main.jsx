import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./React_components/Signup form/Signup.jsx";
import LoginComponent from "./React_components/Login form/LoginComponent.jsx";
import Home from "./React_components/Home content/Home.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import CreatePost from "./React_components/create post/CreatePost.jsx";
import Logout from "./React_components/logout/Logout.jsx";
import Message from "./React_components/message/Message.jsx";
import CurrentuserProfile from "./React_components/CurrentuserProfile/CurrentuserProfile.jsx";
import Search from "./React_components/search/Search.jsx";
import Searchprofile from "./React_components/search/Searchprofile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginComponent />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/createpost",
        element: <CreatePost />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/profile",
        element: <CurrentuserProfile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: `/searchprofile/:userId`,
        element: <Searchprofile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
  // </React.StrictMode>
);
