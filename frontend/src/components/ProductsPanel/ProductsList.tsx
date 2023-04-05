import React from "react";
import { iProduct } from "../../types";
import ProductCard from "./ProductCard";
interface Props {
  pageRef: (node?: Element | null | undefined) => void;
  products: iProduct[];
}

function ProductsList({ pageRef, products }: Props) {
  return (
    <section
      ref={pageRef}
      className="flex min-h-screen flex-wrap place-content-center gap-2 p-2"
    >
      {products.map((productDetails: iProduct) => {
        return (
          !productDetails.isDelete && (
            <ProductCard
              key={productDetails.productId}
              productDetail={productDetails}
            />
          )
        );
      })}
    </section>
  );
}

export default ProductsList;
