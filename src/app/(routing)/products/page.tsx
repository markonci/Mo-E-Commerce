import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import getAllProducts from "../../../_Api/_getAllproducts/getAllProducts.api";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddBtn from "../../(components)/_addBtn/AddBtn";
import AddBtnwishlist from "@/app/(components)/_addBtnwishlist/AddBtnwishlist";

// interface Product {
//   id: number;
//   imageCover: string;
//   images: string[];
//   title: string;
//   category: {
//     name: string;
//   };
//   price: number;
//   ratingsAverage: number;
// }

export const metadata = {
  title: "Products",
  // description: "دي صفحة تجريبية بالـ App Router",
};

export default async function Products() {
  // ---------start cal api ------------
  const data: Product[] = await getAllProducts();
  //----------- end cal api ---------
  // console.log(data);

  return (
    <>
      <div className="dark:bg-[url(/fht6.jpg)]  bg-[url(/rm314-adj-10.jpg)] bg-cover bg-center mt-0 pt-0">
        <div className="container w-[90%] md:w-full   mx-auto justify-center gap-2 flex flex-wrap">
          {data.map((product) => (
            <div
              className="w-[48%] md:w-1/3 lg:w-1/5 xl:w/1/6  mt-5 lg:mt-10"
              key={product.id}
            >
              <Card className="gap-2 mb-0 pb-0 hover:border-green-400 border-3 border-[#c8550d] dark:border-gray-500 dark:hover:border-[#c8550d] p-2">
                {/* -------start button add whlist-----  */}
                    <AddBtnwishlist id={product.id}/>
                  {/* -------end button add whlist-----  */}
                <Link href={`/products/${product.id}`}>

                  <CardHeader>
                    <CardTitle className="relative group w-full">
                      {/* hna ana rbtoham  b groub w 2oltlo awal ma ahovar 3la al card title 5ly alsora obtciy 0  w azhar altanya 
                    w al postion 3lshan alsora altnya tegy mtr7 alwlanya  balzabt w lazem ya5do klmt groub 3lshan 
                    lma a hover 3la nfs almkan alt2ser y7sel 3la altenen fe nfs alsanya  */}
                      {/* الصورة الأساسية */}
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-auto  transition-opacity duration-300 group-hover:opacity-0"
                        width={500}
                        height={500}
                      />

                      {/* الصورة اللي هتظهر مع الهوفر */}
                      <Image
                        src={
                          product.images[2]
                            ? product.images[2]
                            : product.images[0]
                            ? product.images[0]
                            : product.imageCover
                        }
                        // hna b2olo lw al img 2 mwgoda a3rdha msh mogadoa a3rd img0 tb lw im 0 mwgoda a3rdha msh mogada a3rd img cover
                          width={500}
                      height={500}
                        alt={product.title}
                        className="absolute h-auto  top-0 left-0 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </CardTitle>
                    <CardDescription className="mt-2 text-green-400 dark:text-[#c8550d]">
                      {product.category.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-1 hover:line-clamp-none transition-[line-clamp] duration-[2s]">
                      {product.title}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-center md:justify-between   mt-4 gap-4 md-gap-1 items-center  w-full">
                      <span>{product.price}.Eg</span>
                      <span className="flex items-center gap-2">
                        {product.ratingsAverage}{" "}
                        <FaStar className="text-yellow-300" />
                      </span>
                    </div>
                  </CardFooter>
                </Link>
                        <AddBtn id={product.id}/>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
