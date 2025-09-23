"use client";

import React from "react";
import image1 from "../../../../public/images/slider-image-1.jpeg";
import image2 from "../../../../public/images/slider-image-2.jpeg";
import image3 from "../../../../public/images/slider-image-3.jpeg";
import image4 from "../../../../public/images/grocery-banner.png";
import image5 from "../../../../public/images/grocery-banner-2.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";

export default function Mainsilder() {
  return (
    <div className="pt-6 max-md:hidden   mx-auto">
      <div className="flex  justify-center">
        <div className="w-3/4 ">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3000 }}
            effect="flip"
            speed={2000}
          >
            <SwiperSlide>
              <Image
                src={image1}
                alt="silder1"
                className="w-full   md:object-cover  h-[200px] md:h-[400px] "
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image2}
                alt="silder1"
                className="w-full   md:object-cover  h-[200px] md:h-[400px] "
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image3}
                alt="silder1"
                className="w-full   md:object-cover  h-[200px] md:h-[400px] "
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image4}
                alt="silder1"
                className="w-full   md:object-cover  h-[200px] md:h-[400px] "
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image5}
                alt="silder1"
                className="w-full   md:object-cover  h-[200px] md:h-[400px] "
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <Image
            src={image1}
            alt="silder1"
            className="w-full md:object-cover h-[100px] md:h-[200px]"
          />
          <Image
            src={image2}
            alt="silder1"
            className="w-full md:object-cover h-[100px] md:h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}
