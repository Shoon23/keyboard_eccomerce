import React, { useEffect, useState } from "react";
import { apiPrivate } from "../utils/axiosBase";
import { useInterceptors } from "../hooks/useInterceptors";
import useAuthStore from "../store/authStore";
import { usePageRef } from "../hooks/usePageRef";
import { iProduct } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";

function AdminProducts() {
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const axios = apiPrivate(accessToken);
  const api = useInterceptors(axios, accessToken);
  const { pageRef } = usePageRef();
  const [products, setProducts] = useState<iProduct[]>([]);
  const navigate = useNavigate();

  console.log("gago");

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          navigate("/login");
        } else {
          toast.warn("Something Went Wrong Please Try Again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await api.delete(`/products/delete/${productId}`);
      setProducts((prev) => {
        return prev.filter((item) => {
          return item.productId !== productId;
        });
      });

      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          navigate("/login");
        } else {
          toast.warn("Something Went Wrong Please Try Again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  };
  return (
    <main ref={pageRef}>
      <section className="min-h-screen">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th></th>
                <th>Price</th>
                <th>Stock</th>
                <th className="h-10 w-20 cursor-pointer bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-500">
                  <Link to={"/admin/product/add"}> New Product</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                (product) =>
                  !product.isDelete && (
                    <tr key={product.productId}>
                      <th>{product.productId}</th>
                      <td>{product.productName}</td>
                      <td>
                        <img
                          src={product.productImg[0].imgUrl || ""}
                          className="h-12 w-12"
                          alt=""
                        />
                      </td>
                      <td>{product.productPrice}</td>
                      <td>{product.productStock}</td>
                      <td>
                        <Link
                          className="btn-info btn mr-1 text-white   "
                          to={"/admin/product"}
                          state={{ product }}
                        >
                          View More
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.productId)}
                          className="btn-error btn text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default AdminProducts;
