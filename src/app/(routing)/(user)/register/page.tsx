"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { registerschema, registerSchemaType } from "@/schema/register.schema";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { IoMdSync } from "react-icons/io";
import { RegisterAction } from "@/lib/actions/Resgister.action";

export default function Register() {
  const [isLoding, setisLoding] = useState(false);

  const router = useRouter();
  // start react form
  const form = useForm<registerSchemaType>({
    // hna adnhla al type dh 3lshan m2darsh azwod 7aga tany 8er aly fel al schema
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerschema),

    mode: "onChange",
  });
  // end react form

  // ------------start call api ---------
  async function handleregister(values: registerSchemaType) {
    // console.log(values);
    // form.reset()

    // a7na hna 5lanha client component 3ady 3lshan ana hb3at data mn al browser fa msh m7tag
    // a5leha server component
    setisLoding(true);
    try {
      // ----------------start call api server action ------------
      const result = await RegisterAction(values);
      //---------  end call api server action -------------
      // console.log(result);

      if (result.message === "success") {
        // console.log(result);

        setisLoding(false);
        router.push("/login");
        // toast.success('Successfully registered, bro🖤')
        toast.success(`Welcome My Friend ${result?.user?.name}`, {
          duration: 4000,
        });
        form.reset();
      }
    } catch (err) {
      setisLoding(false);
      // toast.error(err?.message || "request failed");
      toast.error(err instanceof Error ? err.message : "can't fetch data")
      // err instanceof Error ? err.message : "cant't fetch data"

      // toast.error(err?.response?.data?.message )
    }
  }

  // ------------end call api ---------

  return (
    <>
      <div className="dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover  bg-opacity-20 bg-center">
        <StyledWrapper>
          <div id="Container">
            {/* ----------------start form-----------  */}
            <Form {...form}>
              <form
                className="form"
                onSubmit={form.handleSubmit(handleregister)}
              >
                <div id="login-lable">Register Now</div>
                {/*--------- start input one--------------  */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="form-content"
                          type="text"
                          placeholder="UserName"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.name && (
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
                {/* // --------- end input one--------------   */}

                {/* // --------- start input two--------------   */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="form-content"
                          type="email"
                          placeholder="email"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="bg-red-200 p-2 text-center mt-3"
                        >
                          <FormMessage />
                        </motion.div>
                      )}{" "}
                    </FormItem>
                  )}
                />
                {/* // --------- end input two--------------   */}

                {/* // --------- start input three--------------   */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="form-content"
                          type="password"
                          placeholder="password"
                          {...field}
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
                      )}{" "}
                    </FormItem>
                  )}
                />
                {/* // --------- end input three--------------   */}

                {/* // --------- start input four--------------   */}
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="form-content"
                          type="password"
                          placeholder="rePassword"
                          {...field}
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
                      )}{" "}
                    </FormItem>
                  )}
                />
                {/* // --------- end input four--------------   */}

                {/* // --------- start input five--------------   */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="form-content"
                          type="tel"
                          placeholder="your phone"
                          {...field}
                        />
                      </FormControl>
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
                      )}{" "}
                    </FormItem>
                  )}
                />
                {/* // --------- end input five--------------   */}

                {/* --------start button ------------ */}
                <button className="mt-1" disabled={isLoding}>
                  {isLoding ? (
                    <IoMdSync className="animate-spin mx-auto  text-4xl" />
                  ) : (
                    "Register"
                  )}
                </button>
                {/* --------end  button ------------ */}

                <Link href="/login" className="text-[20px] underline">
                  Log in... ?
                </Link>
              </form>
            </Form>
            {/* --------hna bdlt alform aly kan howa 3amlha bly ana 3mltha ----------- */}
            {/* ----------------end form-----------  */}
            <div id="rays">
              <svg
                fill="none"
                viewBox="0 0 299 152"
                height="9em"
                width="18em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#paint0_linear_8_3)"
                  d="M149.5 152H133.42L9.53674e-07 4.70132e-06H149.5L299 4.70132e-06L165.58 152H149.5Z"
                />
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="12.1981"
                    x2="150.12"
                    y1={152}
                    x1="149.5"
                    id="paint0_linear_8_3"
                  >
                    <stop stopColor="#00E0FF" />
                    <stop stopOpacity={0} stopColor="#65EDFF" offset={1} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div id="emiter">
              <svg
                fill="none"
                viewBox="0 0 160 61"
                height={61}
                width={160}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_di_1_38)">
                  <path
                    fill="#2B2B2B"
                    d="M80 27.9997C121.974 27.9997 156 22.4032 156 15.4996L156 40.4998C156 47.4034 121.974 52.9998 80 52.9998C38.0265 52.9998 4.00028 47.4034 4 40.4998V40.4998V15.51C4.0342 22.4089 38.0474 27.9997 80 27.9997Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </g>
                <ellipse
                  fill="url(#paint0_radial_1_38)"
                  ry="4.80773"
                  rx="28.3956"
                  cy="17.4236"
                  cx={80}
                />
                <g filter="url(#filter1_i_1_38)">
                  <path
                    fill="#323232"
                    d="M80 28.0002C121.974 28.0002 156 22.4037 156 15.5001C156 8.59648 121.974 3 80 3C38.0264 3 4 8.59648 4 15.5001C4 22.4037 38.0264 28.0002 80 28.0002ZM80.0001 20.308C96.1438 20.308 109.231 18.1555 109.231 15.5002C109.231 12.845 96.1438 10.6925 80.0001 10.6925C63.8564 10.6925 50.7693 12.845 50.7693 15.5002C50.7693 18.1555 63.8564 20.308 80.0001 20.308Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </g>
                <g filter="url(#filter2_di_1_38)">
                  <path
                    fill="#378BA6"
                    d="M106.725 17.4505C108.336 16.8543 109.231 16.1943 109.231 15.4999C109.231 12.8446 96.1438 10.6921 80.0001 10.6921C63.8564 10.6921 50.7693 12.8446 50.7693 15.4999C50.7693 16.1943 51.6645 16.8543 53.2752 17.4504C53.275 17.4414 53.2748 17.4323 53.2748 17.4232C53.2748 14.768 65.2401 12.6155 80.0001 12.6155C94.7601 12.6155 106.725 14.768 106.725 17.4232C106.725 17.4323 106.725 17.4414 106.725 17.4505Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="45.5002"
                    width={160}
                    y="15.4996"
                    x={0}
                    id="filter0_di_1_38"
                  >
                    <feFlood result="BackgroundImageFix" floodOpacity={0} />
                    <feColorMatrix
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      type="matrix"
                      in="SourceAlpha"
                    />
                    <feOffset dy={4} />
                    <feGaussianBlur stdDeviation={2} />
                    <feComposite operator="out" in2="hardAlpha" />
                    <feColorMatrix
                      values="0 0 0 0 0.620833 0 0 0 0 0.620833 0 0 0 0 0.620833 0 0 0 0.25 0"
                      type="matrix"
                    />
                    <feBlend
                      result="effect1_dropShadow_1_38"
                      in2="BackgroundImageFix"
                      mode="normal"
                    />
                    <feBlend
                      result="shape"
                      in2="effect1_dropShadow_1_38"
                      in="SourceGraphic"
                      mode="normal"
                    />
                    <feColorMatrix
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      type="matrix"
                      in="SourceAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation={8} />
                    <feComposite
                      k3={1}
                      k2={-1}
                      operator="arithmetic"
                      in2="hardAlpha"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                      type="matrix"
                    />
                    <feBlend
                      result="effect2_innerShadow_1_38"
                      in2="shape"
                      mode="normal"
                    />
                  </filter>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="25.0002"
                    width={152}
                    y={3}
                    x={4}
                    id="filter1_i_1_38"
                  >
                    <feFlood result="BackgroundImageFix" floodOpacity={0} />
                    <feBlend
                      result="shape"
                      in2="BackgroundImageFix"
                      in="SourceGraphic"
                      mode="normal"
                    />
                    <feColorMatrix
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      type="matrix"
                      in="SourceAlpha"
                    />
                    <feMorphology
                      result="effect1_innerShadow_1_38"
                      in="SourceAlpha"
                      operator="erode"
                      radius={3}
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="6.5" />
                    <feComposite
                      k3={1}
                      k2={-1}
                      operator="arithmetic"
                      in2="hardAlpha"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                      type="matrix"
                    />
                    <feBlend
                      result="effect1_innerShadow_1_38"
                      in2="shape"
                      mode="normal"
                    />
                  </filter>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="26.7583"
                    width="78.4615"
                    y="0.692139"
                    x="40.7693"
                    id="filter2_di_1_38"
                  >
                    <feFlood result="BackgroundImageFix" floodOpacity={0} />
                    <feColorMatrix
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      type="matrix"
                      in="SourceAlpha"
                    />
                    <feMorphology
                      result="effect1_dropShadow_1_38"
                      in="SourceAlpha"
                      operator="dilate"
                      radius={2}
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation={4} />
                    <feComposite operator="out" in2="hardAlpha" />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0.941176 0 0 0 0 1 0 0 0 1 0"
                      type="matrix"
                    />
                    <feBlend
                      result="effect1_dropShadow_1_38"
                      in2="BackgroundImageFix"
                      mode="color-dodge"
                    />
                    <feBlend
                      result="shape"
                      in2="effect1_dropShadow_1_38"
                      in="SourceGraphic"
                      mode="normal"
                    />
                    <feColorMatrix
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      type="matrix"
                      in="SourceAlpha"
                    />
                    <feMorphology
                      result="effect2_innerShadow_1_38"
                      in="SourceAlpha"
                      operator="erode"
                      radius={1}
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation={2} />
                    <feComposite
                      k3={1}
                      k2={-1}
                      operator="arithmetic"
                      in2="hardAlpha"
                    />
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.52 0"
                      type="matrix"
                    />
                    <feBlend
                      result="effect2_innerShadow_1_38"
                      in2="shape"
                      mode="normal"
                    />
                  </filter>
                  <radialGradient
                    gradientTransform="translate(80 17.4236) rotate(90) scale(6.25004 36.9143)"
                    gradientUnits="userSpaceOnUse"
                    r={1}
                    cy={0}
                    cx={0}
                    id="paint0_radial_1_38"
                  >
                    <stop stopColor="#00FFF0" />
                    <stop stopColor="#001AFF" offset="0.901042" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </StyledWrapper>
      </div>
    </>
  );
}

const StyledWrapper = styled.div`
  #Container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
  }

  #rays {
    z-index: 2;
    position: relative;
    bottom: -1.5em;
    animation: rays 2s ease-in-out infinite;
  }

  .form {
    position: relative;
    top: 1em;
    padding: 4%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    border: 4px solid #fff;
    background: rgba(0, 255, 240, 0.52);
    box-shadow: 0px 0px 64px 0px #82e1ff inset, 0px 0px 16px #a8fffaa6;
    backdrop-filter: blur(3.5px);
    gap: 1em;
    animation: float 2s ease-in-out infinite;
  }

  #login-lable {
    text-align: center;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 8px;
    text-shadow: 0px 0px 16px rgb(243, 243, 243);
  }

  .form-content {
    height: 3em;
    padding: 1px 8px;
    color: white;
    text-decoration: none;
    letter-spacing: 1px;
    font-weight: bold;
    border-radius: 6px;
    border: 2px solid #fff;
    background: rgba(139, 255, 247, 0.486);
    box-shadow: 0px 0px 1px 3px #9ee5e3 inset, 0px 4px 4px 0px #181a6040;
    text-shadow: 0px 1px 4px rgb(243, 243, 243);
  }

  .form-content:focus-visible {
    outline: none;
    text-decoration: none;
    background: rgba(139, 189, 255, 0.59);
    box-shadow: 0px 0px 1px 4px #9ee5e3;
  }

  .form-content:hover {
    background: rgba(139, 189, 255, 0.59);
  }

  ::placeholder {
    font-weight: 300;
    color: white;
    letter-spacing: 0.1rem;
    text-shadow: 0px 1px 5px rgb(66, 66, 66);
  }

  .form button {
    cursor: pointer;
    height: 3.5rem;
    padding: 0%;
    color: white;
    font-size: 1.5em;
    letter-spacing: 0.3rem;
    border: 2px solid white;
    background: linear-gradient(144deg, #9c11ffce, #2000eeb6 50%, #15efffbb);
  }

  .form button:hover {
    position: relative;
    bottom: 4px;
    background: linear-gradient(144deg, #9c11ff, #2000ee 50%, #15fff3);
    box-shadow: 0px 0px 2px 2px #ffffff;
  }

  @keyframes float {
    0% {
      position: relative;
    }

    50% {
      top: 50px;
    }

    100% {
      position: relative;
    }
  }

  @keyframes rays {
    0% {
      opacity: 0.6;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.6;
    }
  }
`;
