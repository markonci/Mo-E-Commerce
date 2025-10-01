"use client";
import AddBtn from "@/app/(components)/_addBtn/AddBtn";
import Lodingpage from "@/app/(components)/_loding-cpmponents/lodingpage";
import { Button } from "@/components/ui/button";
import { WishlistContext } from "@/context/WishlistContext";
import getProductWishlist from "@/lib/actions/wishlistActions/getProductWishlist.action";
import removeWishlistItem from "@/lib/actions/wishlistActions/removeWishlistItem.action";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartBroken } from "react-icons/fa";

export default function Wishlist() {
  
  interface Product {
    _id: string;
    imageCover: string;
    title: string;
    quantity: number;
    price: number;
  }


  const [product, setproduct] = useState<Product[]>([]);
  const [isLoding, setisLoding] = useState<boolean>(true);
  const [removeDisaple, setremoveDisaple] = useState<boolean>(false);
  const{myhandleWishlist}= useContext(WishlistContext)!

  //---------- start fn get cart --------------
     async function handleWishlist() {
    try {
      // -----------start call api-----------
      const data = await getProductWishlist();
      // console.log(data);

      // -----------end call api-----------
      if (data.status == "success") {
        setproduct(data.data);

        // console.log(data);
        setisLoding(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "cant't fetch data");
      setisLoding(false);
    }
  }
  //---------- end fn get cart --------------
  console.log(product);

  async function handleRemoveItem(id: string) {
    setremoveDisaple(true);
    try {
      const res = await removeWishlistItem(id);
      if (res.status == "success") {
        console.log(res);
      }
      toast.success("Deleted favorite item successfully👌🖤", {
        duration: 2000,
      });
      handleWishlist();
      myhandleWishlist()
    // (`اول فانكشن علشان يعمل ريموف للمنتج دي تبعت فيتش الجيت 
    //   انما التانية دي بتاعه الكونت تيكست متخصصة بس بتغير اللينس مش الداتا كلها`)

      // let sum=0
      //   res.data.products.forEach((Product:cartProduct)=>{
      //     sum+=Product.count
      //   })
      // setnumperofcartItem(sum)
      setremoveDisaple(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "can't remove this item");
      setremoveDisaple(false);
    }
  }
  // ---------end fn remove item ---------------

  useEffect(() => {
    handleWishlist();
  }, []);

  if (isLoding) {
    return <Lodingpage />;
  }

  return (
    <>
      {product.length > 0 ? (
        <div className="dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
          <div className="container w-full md:w-[80%] mx-auto pt-12">
            <h2 className="font-bold capitalize text-4xl mb-4   text-white ">
              <span className="text-green-700 dark:text-[#c8550d]">
                My Wishlist:
              </span>
            </h2>
            {/* Table for md and up */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-transparent  border-b dark:bg-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Image
                          src={product.imageCover}
                          width={120}
                          height={120}
                          alt={product.title}
                          className="rounded-lg w-auto h-auto"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <span>{product.title}</span>
                        <p className="mt-5">
                          <span className="text-green-700 dark:text-[#c8550d] pe-2">
                            stocks available:
                          </span>{" "}
                          {product.quantity} piece
                        </p>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                        {/* ('بتظهر اول باول مانت علشان خلاص بقا مانت عامل لما يتغير في الكمية يروح يسيت الاستيت بالاري الجديدة ') */}
                      </td>
                      <td className="px-6 py-4 flex flex-col  mt-10">
                        <Button
                          disabled={removeDisaple}
                          onClick={() => handleRemoveItem(product._id)}
                          className="font-medium text-red-600 flex items-center disabled:cursor-no-drop bg-red-300 dark:text-red-500 hover:underline cursor-pointer disabled:bg-gray-700 p-3 disabled:text-gray-500 disabled:dark:text-gray-500"
                        >
                          <span className="flex items-center gap-2">
                            Remove <FaHeartBroken />
                          </span>
                        </Button>
                        <AddBtn id={product._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile */}
            <div className="grid gap-6 md:hidden">
              {product.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center"
                >
                  <Image
                    src={product.imageCover}
                    width={100}
                    height={100}
                    alt={product.title}
                    className="rounded-lg mx-auto sm:mx-0"
                  />
                  <div className="flex-1 mt-4 sm:mt-0 sm:ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="mt-5">
                      <span className="text-green-700 dark:text-[#c8550d] pe-2">
                        stocks available:
                      </span>{" "}
                      {product.quantity} piece
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-900 dark:text-white font-bold">
                        {product.price} EGP
                      </span>
                    </div>
                    <Button
                      disabled={removeDisaple}
                      onClick={() => handleRemoveItem(product._id)}
                      className="font-medium w-full bg-red-300 text-red-600 dark:text-red-500 hover:underline cursor-pointer disabled:bg-gray-700 p-3  disabled:cursor-no-drop  disabled:text-gray-500 disabled:dark:text-gray-500"
                    >
                      Remove
                    </Button>
                    <AddBtn id={product._id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-center text-red-500 font-bold text-5xl pt-7 dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
          no products added yet!🤷‍♂️
        </h2>
      )}
    </>
  );
}
