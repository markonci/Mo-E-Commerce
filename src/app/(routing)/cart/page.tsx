"use client";
import Lodingpage from "@/app/(components)/_loding-cpmponents/lodingpage";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import clearCart from "@/lib/actions/cardActions/clearCart.action";
import getProductCart from "@/lib/actions/cardActions/getProductCart.action";
import removeCartItem from "@/lib/actions/cardActions/removeCartItem.action";
import updateCartCount from "@/lib/actions/cardActions/updateCartCount.action";
import { cartProduct } from "@/types/cartProduct.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSyncAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


// export const metadata = {
//   title: "Cart",
//   // description: "دي صفحة تجريبية بالـ App Router",
// };


export default function Cart() {
  const { numperofcartItem, setnumperofcartItem } = useContext(CartContext)!;

  const [product, setproduct] = useState<cartProduct[]>([]);
  // hna b2olo a3ml genratec type object fe kol aldata bl type of arry
  const [isLoding, setisLoding] = useState(true);
  const [removeDisaple, setremoveDisaple] = useState(false);
  const [updateDisaple, setupdateDisaple] = useState(false);
  const [lodingUpdate, setlodingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [lodingClear, setlodingClear] = useState(false);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cartId,setcartId ] = useState('')

  //---------- start fn get cart --------------
  async function handleCart() {
    try {
      // -----------start call api-----------
      const data = await getProductCart();
      // console.log(data.data.totalCartPrice);

      // -----------end call api-----------
      if (data.status == "success") {
        setproduct(data.data.products);
        // console.log(data);
        setcartId(data.cartId)
        setisLoding(false);
        settotalCartPrice(data.data.totalCartPrice);
      }
    } catch (err) {
      toast.error(`${err}` || "cant't fetch data");
      setisLoding(false);
    }
  }
  // console.log(cartId);
  
  //---------- end fn get cart --------------

  // ---------start fn remove item ---------------
  async function handleRemoveItem(id: string) {
    setremoveDisaple(true);
    setupdateDisaple(true);

    try {
      const res = await removeCartItem(id);
      if (res.status == "success") {
        // console.log(res);
      }
      toast.success("Deleted item successfully👌🖤", {
        duration: 2000,
      });
      setproduct(res.data.products);
      // dy l8enha l2any 5las b2at anady 3la al get mn awal w gdet badel set
      // bs 5l3tha 3lshan alsor3a awal ma y5las ms7 t5tfy asr3
      handleCart();
      let sum = 0;
      res.data.products.forEach((Product: cartProduct) => {
        sum += Product.count;
      });
      setnumperofcartItem(sum);
      setremoveDisaple(false);
      setupdateDisaple(false);
    } catch (err) {
      toast.error("can't remove this item");
      setremoveDisaple(false);
      setupdateDisaple(false);
    }
  }
  // ---------end fn remove item ---------------

  // ------------start fn update Item-------------
  async function handleUpdateCount(id: string, count: number, sign: string) {
    setupdateDisaple(true);
    setlodingUpdate(true);
    setcurrentId(id);
    setremoveDisaple(true);

    try {
      const res = await updateCartCount(id, count);
      if (res.status == "success") {
        setproduct(res.data.products);
        toast.success("update count successfully👌🖤", {
          position: "top-left",
          duration: 2000,
        });
        if (sign == "+") {
          setnumperofcartItem(numperofcartItem + 1);
        } else if (sign == "-") {
          setnumperofcartItem(numperofcartItem - 1);
        }
        // console.log(res);
        setupdateDisaple(false);
        setlodingUpdate(false);
        setremoveDisaple(false);

        // (`لو الباك اند مش مهندلي حتة لو اواد وجيت تنقص امسح انا ممكن اعملها
        //    اقل من واحد  نادي علي فانكشن ريموف product.count اقولو لو `)
        handleCart();
      }
    } catch (err) {
      setupdateDisaple(false);
      setlodingUpdate(false);
      setremoveDisaple(false);

      toast.error(
        err instanceof Error ? err.message : "i can't upffdate this item",
        {
          position: "top-left",
          duration: 2000,
        }
      );
    }
  }
  // ------------end fn update Item-------------

  // -----------start fn clear -----------
  async function handleClear() {
    setlodingClear(true);
    try {
      const res = await clearCart();
      if (res.message == "success") {
        //  handleCart()
        setproduct([]);
        setnumperofcartItem(0);
        // ('الطريقتين يشتغلو بس تاني واحدة الاصح كسرعه واداء وتقليل ريكويست')
        toast.success("clearCart successfully ya bro 👌🖤", {
          position: "top-left",
          duration: 2000,
        });
        setlodingClear(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "i can't clear cart");
      setlodingClear(false);
    }
  }
  // -----------end fn clear -----------

  useEffect(() => {
    handleCart();
  }, []);

  if (isLoding) {
    return <Lodingpage />;
  }
  return (
    <>
      {product.length > 0 ? (
        <div className="dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
          <div className="container w-full md:w-[80%] mx-auto pt-12">
            {/* ----------start button clear-------------  */}
            <Button
              disabled={lodingClear}
              className="cursor-pointer mb-4  disabled:cursor-no-drop  w-full bg-red-400 hover:bg-red-600 duration-[0.2s] font-bold"
              onClick={() => handleClear()}
            >
              {lodingClear ? (
                <FaSyncAlt className="dark:text-white  mx-2 text-black animate-spin" />
              ) : (
                "Clear Cart Item"
              )}
            </Button>
            {/* ----------end button clear-------------  */}
            <h2 className="font-bold capitalize text-2xl mb-4 text-center  text-white ">
              <span className="text-green-700 dark:text-[#c8550d]">
                total cart price:{" "}
              </span>{" "}
              {totalCartPrice} EGP
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
                      Qty
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Image
                          src={product.product.imageCover}
                          width={120}
                          height={120}
                          alt={product.product.title}
                          className="rounded-lg w-auto h-auto"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <span>{product.product.title}</span>
                        <p className="mt-5">
                          <span className="text-green-700 dark:text-[#c8550d] pe-2">
                            stocks available:
                          </span>{" "}
                          {product.product.quantity} piece
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {/* --------start button (-)---------- */}
                          <button
                            disabled={updateDisaple}
                            onClick={() =>
                              handleUpdateCount(
                                product.product.id,
                                product.count - 1,
                                "-"
                              )
                            }
                            className=" disabled:bg-gray-700  disabled:cursor-no-drop  disabled:dark:bg-gray-400 disabled:text-gray-500 disabled:dark:text-gray-500  inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full cursor-pointer focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            {/* {currentCount==product.count?} */}
                            {product.count == 1 ? (
                              <FaRegTrashAlt className="hover:text-red-500 duration-[0.2s] text-2xl" />
                            ) : (
                              "-"
                            )}
                            {/* - */}
                          </button>
                          {/* --------end button (-)---------- */}

                          {/* -------start count---------  */}
                          {product.product.id == currentId ? (
                            lodingUpdate ? (
                              <FaSyncAlt className="dark:text-white  mx-2 text-black animate-spin" />
                            ) : (
                              <span className="mx-3">{product.count}</span>
                            )
                          ) : (
                            <span className="mx-3">{product.count}</span>
                          )}
                          {}
                          {/* -------end count---------  */}

                          {/* ----------start button +------ */}
                          <button
                            disabled={updateDisaple}
                            onClick={() =>
                              handleUpdateCount(
                                product.product.id,
                                product.count + 1,
                                "+"
                              )
                            }
                            // onClick={() => increment(product._id)}
                            className="cursor-pointer disabled:cursor-no-drop   disabled:bg-gray-700 disabled:dark:bg-gray-400 p-3 disabled:text-gray-500 disabled:dark:text-gray-500 inline-flex items-center justify-center text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            +
                          </button>
                          {/* ----------end button +------ */}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price * product.count} EGP
                        {/* ('بتظهر اول باول مانت علشان خلاص بقا مانت عامل لما يتغير في الكمية يروح يسيت الاستيت بالاري الجديدة ') */}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          disabled={removeDisaple}
                          onClick={() => handleRemoveItem(product.product.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer disabled:cursor-no-drop  disabled:bg-gray-700 p-3 disabled:text-gray-500 disabled:dark:text-gray-500"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href={`/checkout/${cartId}`}>
                <Button className="w-full my-5 p-7 font-bold text-[25px] rounded-[20px] cursor-pointer bg-green-700 dark:bg-[#c8550d] dark:hover:bg-sky-400 duration-[0.3s] ">
                  Check Out
                </Button>
              </Link>
            </div>

            {/* Cards for mobile */}
            <div className="grid gap-6 md:hidden">
              {product.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center"
                >
                  <Image
                    src={product.product.imageCover}
                    width={100}
                    height={100}
                    alt={product.product.title}
                    className="rounded-lg mx-auto sm:mx-0 w-auto h-auto"
                  />
                  <div className="flex-1 mt-4 sm:mt-0 sm:ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </h3>
                    <p className="mt-5">
                      <span className="text-green-700 dark:text-[#c8550d] pe-2">
                        stocks available:
                      </span>{" "}
                      {product.product.quantity} piece
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-900 dark:text-white font-bold">
                        {product.price * product.count} EGP
                      </span>
                      <div className="flex items-center">
                        {/* ---------start button (-) -----------*/}
                        <button
                          disabled={updateDisaple}
                          onClick={() =>
                            handleUpdateCount(
                              product.product.id,
                              product.count - 1,
                              "-"
                            )
                          }
                          className=" disabled:bg-gray-700  disabled:cursor-no-drop  disabled:dark:bg-gray-400 disabled:text-gray-500 disabled:dark:text-gray-500  inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full cursor-pointer focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          {/* {currentCount==product.count?} */}
                          {product.count == 1 ? (
                            <FaRegTrashAlt className="hover:text-red-500 duration-[0.2s] text-2xl" />
                          ) : (
                            "-"
                          )}
                          {/* - */}
                        </button>
                        {/* ---------start button (-) -----------*/}
                        <span className="mx-2">{product.count}</span>

                        {/* ---------start button (+)------- */}
                        <button
                          disabled={updateDisaple}
                          onClick={() =>
                            handleUpdateCount(
                              product.product.id,
                              product.count + 1,
                              "+"
                            )
                          }
                          // onClick={() => increment(product._id)}
                          className="cursor-pointer  disabled:cursor-no-drop   disabled:bg-gray-700 disabled:dark:bg-gray-400 p-3 disabled:text-gray-500 disabled:dark:text-gray-500 inline-flex items-center justify-center text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          +
                        </button>
                        {/* ---------end button (+)------- */}
                      </div>
                    </div>
                    <button
                      disabled={removeDisaple}
                      onClick={() => handleRemoveItem(product.product.id)}
                      className="font-medium text-red-600   disabled:cursor-no-drop dark:text-red-500 hover:underline cursor-pointer disabled:bg-gray-700 p-3 disabled:text-gray-500 disabled:dark:text-gray-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
                      <Link className="md:hidden" href={`/checkout/${cartId}`}>
                <Button className="w-full my-5 p-7 font-bold text-[25px] rounded-[20px] cursor-pointer bg-green-700 dark:bg-[#c8550d] dark:hover:bg-sky-400 duration-[0.3s] ">
                  Check Out
                </Button>
              </Link>
        </div>
        
      ) : (
        <h2 className="text-center text-red-500 font-bold text-5xl pt-7 dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
          no products added yet!🤷‍♂️
        </h2>
      )}
    </>
  );
}
