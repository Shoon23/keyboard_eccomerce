import React, { useEffect, useRef, useState } from "react";
import { usePageRef } from "../hooks/usePageRef";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputBox from "../components/Admin/InputBox";
import { iProduct } from "../types";
import { Plus, X } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";
import axios, { isAxiosError } from "axios";
import { usePrivateApi } from "../hooks/usePrivateApi";

function AdminProduct() {
  const { pageRef } = usePageRef();
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const location = useLocation();
  const product: iProduct = location.state.product;
  const navigate = useNavigate();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState<string>(product.productName);
  const [productPrice, setProductPrice] = useState<number>(
    product.productPrice
  );
  const [productStock, setProductStock] = useState<number>(
    product.productStock
  );
  const [productDescription, setProductDescription] = useState<string>(
    product.productDescription
  );
  const [productImg, setProductImg] = useState<
    { imgUrl: string; productId: string; productImgId: string }[]
  >(product.productImg);
  const [toRemoveImg, setToRemoveImg] = useState<any[]>([]);
  const [newProductImg, setNewProductImg] = useState<Array<Blob | null>>([]);
  const [file, setFile] = useState<Array<File>>([]);
  const api = usePrivateApi(accessToken, true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", product.productId);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice.toString());
    formData.append("productStock", productStock.toString());
    formData.append("productDescription", productDescription);
    toRemoveImg.forEach((img) => {
      formData.append("toRemoveImg", img);
    });
    file.forEach((img) => {
      formData.append("images", img);
    });
    try {
      const res = await api.put("/products/update", formData);
      navigate("/admin/products");
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

  const handleaddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hiddenFileInput?.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e?.target?.files?.item(0);

    if (!imageFile) return;
    setFile((prev) => [...prev, imageFile]);
    setNewProductImg((prev: any) => [
      ...prev,
      { imgUrl: URL.createObjectURL(imageFile), imgName: imageFile.name },
    ]);
  };

  const handleRemoveImg = (imgId: string) => {
    setProductImg((prev) => {
      return prev.filter((item) => {
        return item.productImgId !== imgId;
      });
    });
    setToRemoveImg((prev) => [...prev, imgId]);
  };

  const handleRemoveNewImg = (imgName: string) => {
    setNewProductImg((prev) => {
      return prev.filter((item: any) => {
        return item.imgName !== imgName;
      });
    });
    setFile((prev) => {
      return prev.filter((item: any) => {
        return item.imgName !== imgName;
      });
    });
  };

  return (
    <main ref={pageRef}>
      <section className="min-h-screen bg-white">
        <form className="flex flex-col p-10" onSubmit={handleSubmit}>
          <InputBox
            name={"Product Name"}
            value={productName}
            setValue={setProductName}
            type="text"
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              className="textarea-bordered textarea h-24 resize-none"
              placeholder="Bio"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            ></textarea>
          </div>
          <InputBox
            name={"Product Price"}
            value={productPrice}
            setValue={setProductPrice}
            type="number"
          />
          <InputBox
            name={"Product Stock"}
            value={productStock}
            setValue={setProductStock}
            type="number"
          />
          <section className="mt-2 flex gap-1">
            {productImg.map((img) => (
              <div className="relative">
                <img src={img.imgUrl} className="h-40 w-40" />
                <X
                  onClick={() => handleRemoveImg(img.productImgId)}
                  className="absolute top-0 left-32 cursor-pointer"
                  color="red"
                  size={30}
                />
              </div>
            ))}
            {newProductImg.map((img: any) => (
              <div className="relative">
                <img src={img.imgUrl} className="h-40 w-40" />
                <X
                  onClick={() => handleRemoveNewImg(img.imgName)}
                  className="absolute top-0 left-32 cursor-pointer"
                  color="red"
                  size={30}
                />
              </div>
            ))}
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChangeImage}
              hidden
              name="images"
              accept="image/*"
            />
            <button
              onClick={handleaddImage}
              className="btn-info btn self-center text-white"
            >
              <Plus size={20} />
              Add Img
            </button>
          </section>
          <section className="flex justify-end">
            <Link to={"/admin/products"}>
              <button className="btn-ghost btn-active btn">Cancel</button>
            </Link>
            <button className="btn-success btn text-white">Update</button>
          </section>
        </form>
      </section>
    </main>
  );
}

export default AdminProduct;
