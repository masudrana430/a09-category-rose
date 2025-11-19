import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Home from "../Pages/Home";
import Products from "../Pages/Apps";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import ProductsDetails from "../Pages/AppDetails";
import Installation from "../Pages/Installation";
import AppDetails from "../Pages/AppDetails";
import LoadingSpinner from "../Components/LoadingSpinner";
import LoadingSpinnerCopy from "../Components/LoadingSpinnercopy";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Profile from "../Pages/Profile";
import PrivatRoute from "../Provider/PrivatRoute";
import Apps from "../Pages/Apps";
import ForgotPassword from "../Pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <div> <LoadingSpinnerCopy /> </div>,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch('./appData.json'),
        errorElement: <ErrorPage />,
      },
      {
        path: "/apps",
        element: <Apps />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/installation",
        element: <Installation />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/app/:id",
        element: <PrivatRoute><AppDetails /></PrivatRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
        
      },
      {
        path: "/my-profile",
        element: <Profile />,
        
      },

      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/forgot",
            element: <ForgotPassword />,
          },
          

        ],
        
      }

      
    ],
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // }
]);

// console.log(router);

export default router;
