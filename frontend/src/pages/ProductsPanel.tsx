import React, { useEffect, useState } from "react";
import { usePageRef } from "../hooks/usePageRef";
import ProductsList from "../components/ProductsPanel/ProductsList";
import { api } from "../utils/axiosBase";
import { iProduct } from "../types";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";

function ProductsPanel() {
  const { pageRef } = usePageRef();
  const [products, setProducts] = useState<Array<iProduct>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
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
  };

  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
  }, []);

  return (
    <>
      <main ref={pageRef} className="flex flex-col">
        <div className="my-10 ml-3 self-center ">
          <h1 className="text-4xl text-white">Products</h1>
          <h4 className="ml-10 text-gray-300">Keyboard</h4>
        </div>
        {isLoading ? (
          <Loading isWhite={false} isSpinnerBlue={false} />
        ) : (
          <ProductsList products={products} pageRef={pageRef} />
        )}
      </main>
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
    </>
  );
}

export default ProductsPanel;
