import React, { useRef, useState } from "react";
import { usePageRef } from "../hooks/usePageRef";
import { Link, useNavigate } from "react-router-dom";
import { Plus, X } from "react-bootstrap-icons";
import axios, { isAxiosError } from "axios";
import useAuthStore from "../store/authStore";
import InputBox from "../components/Admin/InputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAddProduct() {
  const { pageRef } = usePageRef();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productStock, setProductStock] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string>("");
  const [productImg, setProductImg] = useState<
    { imgUrl: string; imgName: string }[]
  >([]);
  const [file, setFile] = useState<Array<File>>([]);
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdd(true);
    if (
      !productName ||
      !productDescription ||
      !productImg ||
      !productPrice ||
      !productStock ||
      !file
    ) {
      setErr("All Fields Are Required");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice.toString());
    formData.append("productStock", productStock.toString());
    formData.append("productDescription", productDescription);
    file.forEach((img) => {
      formData.append("images", img);
    });
    try {
      const res = await api.post("/products/add", formData);
      navigate("/admin/home");
    } catch (error) {
      setIsAdd(false);
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
    console.log(imageFile);
    if (!imageFile) return;
    setFile((prev) => [...prev, imageFile]);
    setProductImg((prev: any) => [
      ...prev,
      { imgUrl: URL.createObjectURL(imageFile), imgName: imageFile.name },
    ]);
  };

  const handleRemoveImg = (imgName: string) => {
    setProductImg((prev) => {
      return prev.filter((item) => {
        return item.imgName !== imgName;
      });
    });
    setFile((prev) => {
      return prev.filter((item) => {
        return item.name !== imgName;
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
                  onClick={() => handleRemoveImg(img.imgName)}
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
          <section className="flex justify-end gap-1">
            <Link to={"/admin/products"}>
              <button className="btn-ghost btn-active btn">Cancel</button>
            </Link>
            <button disabled={isAdd} className="btn-info btn text-white">
              Add Product
            </button>
          </section>
          {err && (
            <h1 className="flex place-content-center text-2xl text-red-500">
              {err}
            </h1>
          )}
        </form>
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

export default AdminAddProduct;
