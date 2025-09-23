"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {  useParams, useRouter } from "next/navigation";

import { CheckOutschemaType, CheckOutschema } from "@/schema/CheckOut.schema";
import { Button } from "@/components/ui/button";
import { FaSyncAlt, FaWallet } from "react-icons/fa";
import Checkoutonline from "@/lib/actions/Checkout/Checkoutonline.action";
import CheckoutCash from "@/lib/actions/Checkout/CheckoutCash.action";
import { FaCcVisa } from "react-icons/fa";
import { CartContext } from "@/context/CartContext";

export default function Checkout() {
  const [isLoding, setisLoding] = useState(false);
  const router = useRouter();
      const{getUserCart}=useContext(CartContext)!

  // start method cash or visa 
  const [method, setmethod] = useState<"cash" | "visa">("cash");
  // end method cash or visa 

  //-------------- start togale----------------
  const [isTogaleCash, setisTogaleCash] = useState(false);

  const [isTogaleVisa, setisTogaleVisa] = useState(false);

  function changeIsTogaleCash() {
    setisTogaleCash(!isTogaleCash);
  }
  function changeIsTogaleVisa() {
    setisTogaleVisa(!isTogaleVisa);
  }
  //-------------- end togale----------------

  const { id }: { id?: string } = useParams();
  // console.log(id);

  // start use form
  const form = useForm<CheckOutschemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(CheckOutschema),

    mode: "onChange",
  });
  // end use form

  // ------------start call api ---------
  async function handlecheckout(
    values: CheckOutschemaType,
    method: "cash" | "visa"
  ) {
    // ---------start pay cash------------ 
    if (method === "cash") {
      setisLoding(true);
      try {
        if (!id) {
          throw new Error("Cart ID is missing");
        }
        const res = await CheckoutCash(id, values);
        if (res.status === "success") {
          setisLoding(false);
          // console.log(res);
          toast.success("The cash payment process was completed successfully.", {
            duration: 3000,
          });
          router.push('/allorders')
          getUserCart()
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "must be log in");
        setisLoding(false);
      }
      // ---------end pay cash------------ 

      // -----------start pay visa----------
    } else if (method === "visa") {
      setisLoding(true);
      try {
        if (!id) {
          throw new Error("Cart ID is missing");
        }
        // ('كتبنا دة علشان مش عارف الاي دي هيجيلو ولا لا فا عملنا الاف دي')
        const res = await Checkoutonline(id, values);
        if (res.status === "success") {
          // console.log(res.session.url);
          console.log(res);
          window.location.href = res.session.url;
          toast.success("convert to page payment", {
            duration: 3000,
          });
          setisLoding(false);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "must be log in");
        setisLoding(false);
      }
      // -----------end pay visa----------
    }
  }

  return (
    <>
      <div className="dark:bg-[url(/fht6.jpg)] text-white  bg-[url(/3409297.jpg)] bg-cover  bg-opacity-20 bg-center min-h-dvh ">
          <div className="mx-auto w-[80%]  md:w-full  ">
                    <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handlecheckout(values, method)
            )}
            className="max-w-md mx-auto pt-12 text-green-700 dark:text-[#c8550d]  "
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="relative z-0 w-full mb-5 group">
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        name="city"
                        id="floating_city"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                    </FormControl>
                    <label
                      htmlFor="floating_city"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      City
                    </label>
                  </div>

                  {form.formState.errors.city && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-red-200 p-2 text-center mt-3"
                    >
                      <FormMessage />
                    </motion.div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="relative z-0 w-full mb-5 group">
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        name="details"
                        id="floating_details"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                    </FormControl>
                    <label
                      htmlFor="floating_details"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Details
                    </label>
                  </div>

                  {form.formState.errors.details && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-red-200 p-2 text-center mt-3"
                    >
                      <FormMessage />
                    </motion.div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="relative z-0 w-full mb-5 group">
                    <FormControl>
                      <input
                        {...field}
                        type="tel"
                        name="phone"
                        id="floating_phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                    </FormControl>
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone
                    </label>
                  </div>

                  {form.formState.errors.phone && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-red-200 p-2 text-center mt-3"
                    >
                      <FormMessage />
                    </motion.div>
                  )}
                </FormItem>
              )}
            />

            {/* <button disabled={isLoding} className="submit ">
            {isLoding ? (
              <IoMdSync className="animate-spin mx-auto  text-2xl" />
            ) : (
              "Submit"
            )}
          </button> */}
            <div className=" gap-5 flex justify-center items-center">
              <Button
                type="button"
                className="cursor-pointer"
                onClick={changeIsTogaleCash}
              >
                <span className='flex items-center gap-2'><FaWallet/> cash</span>
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={changeIsTogaleVisa}
              >
                <span className='flex items-center gap-2'><FaCcVisa/> visa</span>
              </Button>

              {/* -------start modle cash------ */}
              {isTogaleCash && (
                <>
                  {" "}
                  <div className="fixed  inset-0 flex justify-center items-center bg-black/50">
                    <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
                      <div>
                        <div className="text-center p-3 flex-auto justify-center mx-auto">
                          <FaWallet className="text-center mx-auto text-4xl animate-bounce" />
                          <h2 className="text-xl font-bold py-4 text-gray-200">
                            cash
                          </h2>
                          <p className="font-bold text-sm text-gray-500 px-2">
                            Are you sure pay cash?
                          </p>
                        </div>
                        <div className="p-2 mt-2 text-center  space-x-1 flex">
                          <button
                            type="button"
                            onClick={changeIsTogaleCash}
                            className=" cursor-pointer  mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setmethod("cash")}
                            type="submit"
                            className="cursor-pointer  bg-green-700 hover:bg-transparent dark:hover:bg-transparent dark:bg-[#c8550d] px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                          >
                            {isLoding ? (
                              <FaSyncAlt className="dark:text-white  mx-2 text-black animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* -------end modle cash------ */}
                </>
              )}

              {/* -------start modle Visa------ */}
              {isTogaleVisa && (
                <>
                  {" "}
                  <div className="fixed  inset-0 flex justify-center items-center bg-black/50">
                    <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
                      <div>
                        <div className="text-center p-3 flex-auto justify-center mx-auto">
                          <FaCcVisa className="text-center mx-auto text-4xl animate-bounce" />
                          <h2 className="text-xl font-bold py-4 text-gray-200">
                            Visa
                          </h2>
                          <p className="font-bold text-sm text-gray-500 px-2">
                            Are you sure pay Visa?
                          </p>
                        </div>
                        <div className="p-2 mt-2 text-center  space-x-1 flex">
                          <button
                            type="button"
                            onClick={changeIsTogaleVisa}
                            className=" cursor-pointer  mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={() => setmethod("visa")}
                            className="cursor-pointer  bg-green-700 hover:bg-transparent dark:hover:bg-transparent dark:bg-[#c8550d] px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                          >
                            {isLoding ? (
                              <FaSyncAlt className="dark:text-white  mx-2 text-black animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* -------start modle Visa------ */}
                </>
              )}
            </div>
          </form>
        </Form>
          </div>
      </div>
    </>
  );
}
