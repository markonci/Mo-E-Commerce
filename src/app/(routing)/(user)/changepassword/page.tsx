"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";
import { IoMdSync } from "react-icons/io";
import { changePasswordSChema, changePasswordSChemaType } from "@/schema/changePassword.schema";
import changePassword from "@/lib/actions/changepassword/changePassword.action";
import { signOut } from "next-auth/react";

export default function Changepasswoed() {
  const [isLoading, setisLoading] = useState(false)
  // start use form
  const form = useForm<changePasswordSChemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onChange",
    resolver:zodResolver(changePasswordSChema)
  });
  // end use form
    async function handleChangePassword(values:changePasswordSChemaType){
      console.log(values);

      setisLoading(true)
       try {
         const res = await changePassword(values)
         console.log(res);
         
        if(res.message==='success'){

          console.log(res);
          toast.success(`${res.message} ya bro🖤`,{
            duration:3000
          })
                setisLoading(false)
                signOut({ callbackUrl: "/login" })
                // (hndlt al7ta de 3lshan lma kont  b8er al password kan al cart my3rfsh ygapha 
                //   w brdo wshlist fa 3lshan kdea kont b3mal sgin out 7ta hwa fe almseaage by2oalk a3mal sginin lw 3awz t8ero tany
                //  )
                // router.push('/verifyResetCode')

        }
       }
       catch(err){
        toast.error(err instanceof Error ? err.message : "can't Reset code sent to your email!!")
                        setisLoading(false)

       }
      
    }

  return (
    <div className="dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
      <div className="flex justify-center items-center pt-12  ">
        <StyledWrapper className=''>
          <div className="card flex items-center w-[320px]  justify-center mx-auto md:w-[410px] xl:w-[510x] md:h-[380px] ">
            <div className="BG">
              <svg
                viewBox="0 0 512 512"
                className="ionicon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 176a80 80 0 1080 80 80.24 80.24 0 00-80-80zm172.72 80a165.53 165.53 0 01-1.64 22.34l48.69 38.12a11.59 11.59 0 012.63 14.78l-46.06 79.52a11.64 11.64 0 01-14.14 4.93l-57.25-23a176.56 176.56 0 01-38.82 22.67l-8.56 60.78a11.93 11.93 0 01-11.51 9.86h-92.12a12 12 0 01-11.51-9.53l-8.56-60.78A169.3 169.3 0 01151.05 393L93.8 416a11.64 11.64 0 01-14.14-4.92L33.6 331.57a11.59 11.59 0 012.63-14.78l48.69-38.12A174.58 174.58 0 0183.28 256a165.53 165.53 0 011.64-22.34l-48.69-38.12a11.59 11.59 0 01-2.63-14.78l46.06-79.52a11.64 11.64 0 0114.14-4.93l57.25 23a176.56 176.56 0 0138.82-22.67l8.56-60.78A11.93 11.93 0 01209.94 26h92.12a12 12 0 0111.51 9.53l8.56 60.78A169.3 169.3 0 01361 119l57.2-23a11.64 11.64 0 0114.14 4.92l46.06 79.52a11.59 11.59 0 01-2.63 14.78l-48.69 38.12a174.58 174.58 0 011.64 22.66z" />
              </svg>
            </div>

            <div className="content">
              <p className="heading">Hello my bro 🙌👋</p>
              <p className="sub-heading mt-4">ChangePassword</p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleChangePassword)}
                >

                  <FormField
                    name="currentPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        {/* <label htmlFor="email" className="me-auto mb-0 pb-0">
                          Your Email:
                        </label> */}
                        <FormControl>
                          <input
                            {...field}
                            className="email w-full mt-0 pt-0"
                            placeholder="currentPassword"
                            type="password"
                            id="currentPassword"
                          />
                        </FormControl>

                        {form.formState.errors.currentPassword && (
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
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        {/* <label htmlFor="email" className="me-auto mb-0 pb-0">
                          Your Email:
                        </label> */}
                        <FormControl>
                          <input
                            {...field}
                            className="email w-full mt-0 pt-0"
                            placeholder="Password"
                            type="password"
                            id="Password"
                          />
                        </FormControl>

                        {form.formState.errors.password && (
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
                    name="rePassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        {/* <label htmlFor="email" className="me-auto mb-0 pb-0">
                          Your Email:
                        </label> */}
                        <FormControl>
                          <input
                            {...field}
                            className="email w-full mt-0 pt-0"
                            placeholder="RePassword"
                            type="password"
                            id="rePassword"
                          />
                        </FormControl>

                        {form.formState.errors.rePassword && (
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

                  <Button disabled={isLoading} type="submit" className="card-btn p-5">
                    {isLoading?<IoMdSync className="animate-spin mx-auto  text-2xl" />:'Change Password'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </StyledWrapper>
      </div>
    </div>
  );
}

const StyledWrapper = styled.div`
  .card {
    // width: 510px;
    // height: 280px;
    position: relative;
    background-color: rgb(255, 255, 255);
    border-bottom: 3px solid #4c6bff;
    overflow: hidden;
    box-shadow: 0px 12px 65px -39px rgba(0, 0, 0, 1);
    border-radius: 5px;
  }
  .BG {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .BG svg {
    position: absolute;
    width: 50%;
    left: -20%;
    top: -20%;
    fill: rgb(244, 244, 244);
    transition: all 0.5s;
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 25px;
    color: rgb(30, 30, 30);
    gap: 3px;
  }
  .heading {
    font-size: 1.4em;
    font-weight: 700;
    color: rgb(30, 30, 30);
  }
  .sub-heading {
    margin-top: -7px;
    font-size: 0.9em;
    font-weight: 600;
    color: rgb(30, 30, 30);
  }
  .sub-sub-heading {
    font-size: 0.7em;
    color: rgb(128, 128, 128);
  }
  .email {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid #c0c7ec;
    outline: none;
    font-size: 0.9em;
    background-color: transparent;
  }
  .card-btn {
    margin-top: 20px;
    height: 40px;
    width: 100%;
    border: none;
    background: linear-gradient(60deg, #4c6bff, #8196ff);
    color: white;
    border-radius: 30px;
    cursor: pointer;
  }
  .card:hover .BG svg {
    left: 0%;
    top: 0%;
    transform: rotate(180deg) scale(9);
    fill: #c0c7ec;
  }
`;
