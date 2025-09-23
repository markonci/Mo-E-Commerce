import React from 'react'
import getAllCategrios from '@/_Api/_getAllCategrios/getAllCategrios.api';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Category } from '@/types/allcategories.type';

export const metadata = {
  title: "Categories",
  // description: "دي صفحة تجريبية بالـ App Router",
};

export default async function Categories() {
  const {data}:{data:Category[]}=await getAllCategrios()
  // console.log(data);
  
  return (
    <>
    {/* <Categeriossilder/> */}
        <div className="dark:bg-[url(/fht6.jpg)]  bg-[url(/3409297.jpg)] bg-cover  bg-opacity-20 bg-center min-h-dvh mt-0 pt-0">
        <div className="container w-[90%] md:w-full   mx-auto  gap-2 flex flex-wrap justify-center">
          {data.map((product) => (
            <div key={product._id} className="w-[48%] md:w-1/3 lg:w-1/5 xl:w-1/6  mt-5 lg:mt-10">
            <Link href={`/categories/categoriesDetalis`}>
              <Card className="mb-0  pb-0 border-0 gap-0 shadow-0">
                <CardContent className='border-0 px-0 my-0  h-[270px]'>
                  <Image
                  src={product.image}
                  alt={product.name} 
                  width={300}
                  height={150}
                  className="object-cover w-full h-full rounded-md "
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
    
  )
}
