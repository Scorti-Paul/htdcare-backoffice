import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./layout";
import LoginPage from "pages/auth/login";
import ForgotPassword from "pages/auth/forgot";
import PageNotFound from "pages/pagenotfound";
import { FC } from "react";
import ResetPassword from "pages/auth/reset";
import Dashboard from "pages/main/dashboard";
import Services from "pages/main/services";
import CreateServices from "pages/main/services/components/create";
import UpdateService from "pages/main/services/components/update";
import Orders from "pages/main/orders";
import UpdateOrder from "pages/main/orders/components/updateorder";
import UserProfile from "pages/main/users/components/userprofile";
import UpdateUser from "pages/main/users/components/updateuser";
import CreateUser from "pages/main/users/components/createuser";
import Users from "pages/main/users";
import Settings from "pages/main/settings";
import Category from "pages/main/category/category"; 
import Patients from "pages/main/patients";
import CreatePatient from "pages/main/patients/components/create";
import UpdatePatient from "pages/main/patients/components/update";
import Dentists from "pages/main/dentists";
import CreateDentist from "pages/main/dentists/components/create";
import UpdateDentist from "pages/main/dentists/components/update";
import Appointments from "pages/main/appointments";
import UpdateAppointment from "pages/main/appointments/components/update";
import CreateAppointment from "pages/main/appointments/components/create";
import ViewPatient from "pages/main/patients/components/view";
import Products from "pages/main/products";
import CreateProduct from "pages/main/products/components/create";
import UpdateProduct from "pages/main/products/components/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/appointments",
        element: <Appointments />
      },
      {
        path: "/appointments/schedule-appointment",
        element: <CreateAppointment />
      },
      {
        path: "/appointments/update-appointment",
        element: <UpdateAppointment />
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/patients/patient",
        element: <ViewPatient />,
      },
      {
        path: "/patients/create-patient",
        element: <CreatePatient />,
      },
      {
        path: "/patients/update-patient",
        element: <UpdatePatient />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "/services/create-service",
        element: <CreateServices />,
      },
      {
        path: "/services/update-service",
        element: <UpdateService />,
      },
      {
        path: "dentists",
        element: <Dentists />,
      },
      {
        path: "/dentists/create-dentist",
        element: <CreateDentist />,
      },
      {
        path: "/dentists/update-dentist",
        element: <UpdateDentist />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/create-product",
        element: <CreateProduct />,
      },
      {
        path: "products/update-product",
        element: <UpdateProduct />,
      },
      {
        path: "/orders/update-order",
        element: <UpdateOrder />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/create-user",
        element: <CreateUser />,
      },
      {
        path: "users/update-user",
        element: <UpdateUser />,
      },
      {
        path: "users/user/profile",
        element: <UserProfile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "categories",
        element: <Category />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  }
])

const Navigator: FC = () => {
  return <RouterProvider router={router} />
}

export default Navigator;