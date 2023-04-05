import React from "react";
import { Link } from "react-router-dom";
import { iProduct } from "../../types";

interface Props {
  productDetail: iProduct;
}

function ProductCard({ productDetail }: Props) {
  return (
    <Link
      to={`/product/${productDetail.productId}`}
      className="flex h-60 w-44 cursor-pointer flex-col rounded-md bg-white md:h-72 md:w-72 md:gap-4"
    >
      <div className="h-4/6	 self-center ">
        <img src={productDetail.productImg[0].imgUrl} className="" alt="" />
      </div>
      <div className=" flex flex-col gap-2 p-2">
        <h1 className="text-sm md:text-base">{productDetail.productName}</h1>
        <h2 className="text-xs text-yellow-500 md:text-sm">
          P{productDetail.productPrice}
        </h2>
      </div>
    </Link>
  );
}

export default ProductCard;
