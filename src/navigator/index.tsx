import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./layout";
import LoginPage from "pages/auth/login";
import ForgotPassword from "pages/auth/forgot";
import PageNotFound from "pages/pagenotfound";
import { FC } from "react";
import ResetPassword from "pages/auth/reset";
import Dashboard from "pages/main/dashboard";
import Products from "pages/main/products/products";
import Branches from "pages/main/branches/branches";
import CreateBranch from "pages/main/branches/components/createbranch";
import UpdateBranch from "pages/main/branches/components/updatebranch";
import CreateProducts from "pages/main/products/components/createproducts";
import UpdateProduct from "pages/main/products/components/updateProduct";
import Services from "pages/main/services";
import CreateServices from "pages/main/services/components/createservices";
import UpdateService from "pages/main/services/components/updateservice";
import Farmers from "pages/main/farmers";
import CreateFarmers from "pages/main/farmers/components/createfarmer";
import UpdateFarmer from "pages/main/farmers/components/updatefarmer";
import ViewSingleFarmer from "pages/main/farmers/components/viewfarmer";
import Produce from "pages/main/produce";
import CreateProduce from "pages/main/produce/components/createproduce";
import UpdateProduce from "pages/main/produce/components/updateproduce";
import Orders from "pages/main/orders";
import UpdateOrder from "pages/main/orders/components/updateorder";
import UserProfile from "pages/main/users/components/userprofile";
import UpdateUser from "pages/main/users/components/updateuser";
import CreateUser from "pages/main/users/components/createuser";
import Users from "pages/main/users";
import Settings from "pages/main/settings";
import Category from "pages/main/category/category";
import Production from "pages/main/production";
import UpdateProduction from "pages/main/production/components/updateproduction";
import CreateProduction from "pages/main/production/components/createproduction";
import ServiceRequests from "pages/main/servicerequests/servicerequests";
import CreateServiceRequests from "pages/main/servicerequests/components/createservicerequests";
import UpdateServiceRequests from "pages/main/servicerequests/components/updateservicerequests";

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
        path: "/products",
        element: <Products />
      },
      {
        path: "branches",
        element: <Branches />,
      },
      {
        path: "create-branch",
        element: <CreateBranch />,
      },
      {
        path: "/branches/update-branch",
        element: <UpdateBranch />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "createproducts",
        element: <CreateProducts />,
      },
      {
        path: "/products/update-product",
        element: <UpdateProduct />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "createservices",
        element: <CreateServices />,
      },
      {
        path: "/services/update-service",
        element: <UpdateService />,
      },
      {
        path: "farmers",
        element: <Farmers />,
      },
      {
        path: "createfarmers",
        element: <CreateFarmers />,
      },
      {
        path: "/farmers/update-farmer",
        element: <UpdateFarmer />,
      },
      {
        path: "/farmers/farmer",
        element: <ViewSingleFarmer />,
      },
      {
        path: "produce",
        element: <Produce />,
      },
      {
        path: "createproduce",
        element: <CreateProduce />,
      },
      {
        path: "/produce/update-produce",
        element: <UpdateProduce />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "/service-requests",
        element: <ServiceRequests />,
      },
      {
        path: "create-servicerequests",
        element: <CreateServiceRequests />,
      },
      {
        path: "service-requests/update",
        element: <UpdateServiceRequests />,
      },
      {
        path: "production",
        element: <Production />,
      },
      {
        path: "create-production",
        element: <CreateProduction />,
      },
      {
        path: "production/update-production",
        element: <UpdateProduction />,
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
        path: "createuser",
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