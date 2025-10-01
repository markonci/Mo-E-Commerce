'use client'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

interface ProductdeatlisSwiperProps {
  data: {
    images?: string[];
    title?: string;
  };
}

export default function ProductdeatlisSwiper({data}:ProductdeatlisSwiperProps) {
  return (
    <>
    <Swiper className="mt-2"
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        speed={2000}
      >

        {data.images?.map((img,i)=>(

<SwiperSlide key={i}>
              {/* i dy al index mtf2aen any tany rkm dh e al map daymen index */}
              <Image
                className="w-full  "
                src={img}
                alt={data.title||''}
                // hatena aw 3lshan fo2 b2olo mmkn tgelk aw l2 fa lazem 2olo lw m2agtalgsh mslan mto7atsh 7aga
                width={500}
                height={500}
              />
              
            </SwiperSlide>
        ))}
          
                          
              
                          

      </Swiper>
    </>
  )
}
