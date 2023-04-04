import React, { useEffect, useState } from "react";
import { apiPrivate } from "../utils/axiosBase";
import { useInterceptors } from "../hooks/useInterceptors";
import useAuthStore from "../store/authStore";
import { usePageRef } from "../hooks/usePageRef";
import { iProduct } from "../types";
import { Link } from "react-router-dom";
function AdminProducts() {
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const axios = apiPrivate(accessToken);
  const api = useInterceptors(axios, accessToken);
  const { pageRef } = usePageRef();
  const [products, setProducts] = useState<iProduct[]>([]);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main ref={pageRef}>
      <section className="min-h-screen">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th></th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <th>{product.productId}</th>
                  <td>{product.productName}</td>
                  <td>
                    <img
                      src={product.productImg[0].imgUrl}
                      className="h-12 w-12"
                      alt=""
                    />
                  </td>
                  <td>{product.productPrice}</td>
                  <td>{product.productStock}</td>
                  <td>
                    <Link
                      className="bg-sky-600 text-white"
                      to={"/admin/product"}
                      state={{ product }}
                    >
                      View More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminProducts;
