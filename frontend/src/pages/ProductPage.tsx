import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ProductPage/ProductDetails";
import ProductReview from "../components/ProductPage/ProductReview";
import { usePageRef } from "../hooks/usePageRef";
import { useParams } from "react-router-dom";
import { api } from "../utils/axiosBase";
import { iProduct, iProductReview } from "../types";
import { isAxiosError } from "axios";
import { CircleHalf } from "react-bootstrap-icons";

function ProductPage() {
  const { productId } = useParams();
  const { pageRef } = usePageRef();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] =
    useState<iProduct>(initialDetails);
  const [productReviews, setProductReviews] = useState<Array<iProductReview>>(
    []
  );
  const [error, setError] = useState<string>("");

  const fetchSingleProduct = async (productId: string) => {
    try {
      const res = await api.get(`/products/${productId}`);
      const { reviews, ...other } = res.data;
      setProductDetails(other);
      setProductReviews(reviews);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetchSingleProduct(productId as string);
    setIsLoading(false);
  }, []);

  return (
    <main>
      {isLoading ? (
        <section
          ref={pageRef}
          className="flex min-h-screen items-center justify-center"
        >
          <CircleHalf className="animate-spin fill-white " size={50} />
        </section>
      ) : error ? (
        <section ref={pageRef} className="min-h-screen">
          <h1>{error}</h1>
        </section>
      ) : (
        <>
          <ProductDetails
            totalReviews={productReviews.length}
            pageRef={pageRef}
            productDetails={productDetails}
          />
          <ProductReview
            setProductReviews={setProductReviews}
            productId={productDetails.productId}
            productReviews={productReviews}
          />
        </>
      )}
    </main>
  );
}

const initialDetails = {
  productDescription: "",
  productId: "",
  productImg: [],
  productName: "",
  productPrice: 0,
  productStock: 0,
  isDelete: false,
};

export default ProductPage;
