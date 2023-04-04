import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ProductsPanel from "./pages/ProductsPanel";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PrivateRoutes from "./middleware/PrivateRoutes";
import PersistAuth from "./middleware/PersistAuth";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import SuccesCheckout from "./pages/SuccesCheckout";
import AdminRoutes from "./middleware/AdminRoutes";
import Admin from "./pages/Admin";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import Navbar from "./components/Admin/Navbar";
import AdminProducts from "./pages/AdminProducts";
import AdminProduct from "./pages/AdminProduct";

const router = createBrowserRouter([
  {
    element: <PersistAuth />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "products",
            element: <ProductsPanel />,
          },
          {
            path: "product/:productId",
            element: <ProductPage />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "success",
            element: <SuccesCheckout />,
          },
          {
            element: <PrivateRoutes />,
            children: [
              {
                path: "cart",
                element: <Cart />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                element: <AdminRoutes />,
                children: [
                  {
                    path: "admin",
                    element: <Navbar />,
                    children: [
                      {
                        path: "home",
                        element: <Admin />,
                      },
                      {
                        path: "order",
                        element: <AdminOrdersPage />,
                      },
                      {
                        path: "products",
                        element: <AdminProducts />,
                      },
                      {
                        path: "product",
                        element: <AdminProduct />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
