"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";

import Image from "next/image";

interface Category {
  _id: string;
  image: string;
  name: string;
}

interface CategorieswiperProps {
  data: Category[];
}
// hna bdal ma aktb {data}:{data:Category[]} ana a5tsartha fo2 lw rkzt  l2any Category object  CategorieswiperProps  object of arry 
// wana kont mn alwal 3awz a3ml intr face arry of object w alobject kol 7aga gowha mt3rfa 

export default function Categorieswiper({ data }:CategorieswiperProps) {
  // console.log(data);

  return (
    <>
    <h2 className="md:text-2xl text-slate-600 font-bold mb-2  pt-5">Shop Popular Categories </h2>
    
      <Swiper className="mt-2"
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3000 }}
        effect="flip"
        speed={2000}
      >
          {data.map((category)=>(
                          <SwiperSlide key={category._id} >
              <Image
                className="w-full  md:object-cover h-[150px]    md:h-[200px] "
                width={500}
                height={500}
                src={category.image}
                alt={category.name}
              />
              <p  className="text-center max-md:hidden  ">{category.name}</p>
            </SwiperSlide>
        ))}
      </Swiper>

    </>
  );
}
