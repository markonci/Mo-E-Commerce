import getProductDetalis from "@/_Api/_getProductDetalis/getProductDetalis.api";
import React from "react";
import { FaStar } from "react-icons/fa";
import { Product } from "@/types/productdetails.type";
import AddBtn from "@/app/(components)/_addBtn/AddBtn";
import AddBtnwishlist from "@/app/(components)/_addBtnwishlist/AddBtnwishlist";
import getRealtedProducts from "@/lib/actions/realtedProducts/realtedProducts.action";
import Selectproducts from "@/app/(components)/_selectproducts/Selectproducts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Products detalis",
  // description: "دي صفحة تجريبية بالـ App Router",
};

// interface Params {
//   id: string;
// }

// interface ProductDetailsProps {
//   params: Params;
// }

// interface Product {
//   title: string;
//   description: string;
//   category: { name: string };
//   price: number;
//   ratingsAverage: number;
//   quantity: number;
//   imageCover?: string;
//   images?: string[];
// }

export interface catProduct {
  id: string;
  imageCover: string;
  images: string[];
  title: string;
  category: {
    name: string;
  };
  price: number;
  ratingsAverage: number;
}
// 3mlt copy mn altaype bt3 all product w 8ert asmo l2any bl 8alt smeto nfs asm type product detalis  w mkansh ynf3 aro7 
// a8ero fe almosro3 kolo fa ro7t 3mlt copy w ns5to hna w 8ert asm altaype


export default async function Productdetalis({ params }:{params:Promise<{id:string}>}) {
  // ana 5letha mn no3 processmis l2any 
  // lma a build aawait hhdtrab error l2anana sha8elen verison 7adesa fa m7atag 2olo anta mn no3 Promise
  const { id } = await params;
// (`id alu fo2 fe url prams rkz`)
  // -----------start call Api -------------
  const { data }:{data:Product} = await getProductDetalis(id);
  // -----------start call Api -------------
  // console.log(data);
  // console.log(data.category._id);
  
  if(!data){
    throw new Error(`try again my friend🖤✨`)
  }
  const CatId=data.category._id
  // console.log(CatId);
  

  // hna ana brmi error l  page error next w stlmtha hnak fe props {error}
  const realtedProducts:{data:catProduct[]}=await getRealtedProducts(CatId)
  // (hna b2olo al taype bt3ak hykon object gowha data aldata mn no3 altaype aly katbto gowa arry)
    // console.log(realtedProducts);


    // ('w kan fe error mkantsh almontagat btzhar fs btdef kan 3ep fe astrad al link')


  return (
    <>
      <Selectproducts data={data}/>
          <div className='dark:bg-[url(/fht6.jpg)]  bg-[url(/rm314-adj-10.jpg)] bg-cover bg-center'>
                      <div className="container w-[90%] md:w-full   mx-auto justify-center gap-2 flex flex-wrap">
          {realtedProducts.data?.map((product) => (
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
