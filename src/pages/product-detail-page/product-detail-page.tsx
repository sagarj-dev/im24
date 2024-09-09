import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("")

  const { data: ProductDetails, isLoading, isError, error } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: async () => {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/photos?id=${id}`
      )
      return await response.data
    },
  });

  useEffect(() => {
    if (ProductDetails && ProductDetails.length > 0) setImgUrl(ProductDetails[0]?.thumbnailUrl)
  }, [ProductDetails])

  if (isLoading) return <div className="h-[90vh] flex justify-center items-center"><ClipLoader color="blue" /></div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="py-2.5 px-5 flex flex-col gap-3">
      <div
        className="inline-flex items-center cursor-pointer w-max mb-5 text-slate-500 hover:text-slate-950 transition-colors duration-200"
        onClick={() => navigate("/")}>
        <MdArrowBackIos size={25} /> <p className="text-xl font-semibold leading-2">Go back</p>
      </div>
      <h1 className="text-xl font-bold">Product Detail Page</h1>
      <div className="flex gap-5 border border-solid rounded-md p-2.5 w-max my-5">
        <img
          src={imgUrl}
          alt={ProductDetails[0].title}
          className=" rounded"
          loading="lazy"
          width={150}
          height={150}
          title={ProductDetails[0].title}
          onError={() => setImgUrl("https://via.placeholder.com/150/5e12c6")}
        />
        <div>
          <p>Album ID: <b>{ProductDetails[0]?.albumId ?? "-"}</b></p>
          <p>Product ID: <b>{ProductDetails[0]?.id ?? "-"}</b></p>
          <p>Product Title: <b>{ProductDetails[0]?.title ?? "-"}</b></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
