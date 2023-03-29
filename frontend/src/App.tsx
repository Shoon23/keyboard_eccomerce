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
