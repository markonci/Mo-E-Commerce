import React from "react";
import getAllBrands from "@/_Api/_getAllBrands/getAllBrands.api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types/allBrands.type";

export const metadata = {
  title: "Brands",
  // description: "دي صفحة تجريبية بالـ App Router",
};

export default async function Brands() {
  const { data }:{data:Brand[]} = await getAllBrands();
  // console.log(data);
  
  return (
    <>
      <div className="dark:bg-[url(/fht6.jpg)]  bg-[url(/3409297.jpg)] bg-cover  bg-opacity-20 bg-center min-h-dvh mt-0 pt-0">
        <div className="container w-[90%] md:w-full   mx-auto  gap-2 flex flex-wrap justify-center">
          {data.map((product) => (
            <div key={product._id} className="w-[48%] md:w-1/3 lg:w-1/5 xl:w-1/6  mt-5 lg:mt-10">
            <Link href={`/brands/${product._id}`}>
              <Card className="mb-0  pb-0 border-0 gap-0 shadow-0">
                <CardContent className='border-0 px-0 my-0'>
                  <Image
                  src={product.image}
                  alt={product.name} 
                  width={300}
                  height={300}
                  className="w-full"
                   priority
                  />
                </CardContent>
                <CardFooter className=' p-3 font-bold dark:bg-black bg-gray-400 text-white dark:text-yellow-300'>
                  <p className="mx-auto" >{product.name}</p>
                </CardFooter>
              </Card>
            </Link>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
