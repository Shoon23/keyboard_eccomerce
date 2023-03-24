import React, { useEffect, useState } from "react";
import { usePageRef } from "../hooks/usePageRef";
import ProductsList from "../components/ProductsPanel/ProductsList";
import { api } from "../utils/axiosBase";
import { iProduct } from "../types";

function ProductsPanel() {
  const { pageRef } = usePageRef();
  const [products, setProducts] = useState<Array<iProduct>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
  }, []);

  return (
    <>
      <main className="flex flex-col">
        <div className="my-10 ml-3 self-center ">
          <h1 className="text-4xl text-white">Products</h1>
          <h4 className="ml-10 text-gray-300">Keyboard</h4>
        </div>
        {isLoading ? (
          <div className="">Loading.....</div>
        ) : (
          <ProductsList products={products} pageRef={pageRef} />
        )}
      </main>
    </>
  );
}

export default ProductsPanel;
