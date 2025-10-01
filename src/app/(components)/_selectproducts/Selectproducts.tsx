import React from 'react'
import ProductdeatlisSwiper from '../_productdeatlisSwiper/ProductdeatlisSwiper'
import AddBtnwishlist from '../_addBtnwishlist/AddBtnwishlist'
import AddBtn from '../_addBtn/AddBtn'
import { FaStar } from 'react-icons/fa'
import { Product } from '@/types/productdetails.type'

export default function Selectproducts({data}:{data:Product}) {
  return (
          <div className="dark:bg-[url(/fht6.jpg)] text-white  bg-[url(/3409297.jpg)] bg-cover  bg-opacity-20 bg-center min-h-dvh">
        <div className=" container lg:w-[60%] mx-auto pt-7">
        <div className="flex gap-8  flex-wrap items-center p-3 justify-center  ">
          <div className=" w-full lg:w-[38%] ">
           
              {/* start silder img  */}
            <ProductdeatlisSwiper data={data}/>
              {/* end silder img  */}
          </div>
          <div className=" w-full lg:w-[57%]">
     
            <div className="header flex justify-between items-center">
                <h2 className="mb-5 lg:mb-5  text-green-700 dark:text-[#c8550d]">{data.title}</h2>
                  <AddBtnwishlist id={data.id}/>
            </div>
                    <div className="body">
                        
            <p>{data.description}</p>

            <p className="mt-4  text-sky-400 dark:text-[#c8550d]">{data.category.name}</p>
                    </div>
            <div className="footer">
                <div className="flex justify-between mt-4  w-full">
              <span><span className="text-green-700 dark:text-[#c8550d]">Price:</span> {data.price}.Eg</span>
              <span className="flex items-center gap-2">
                {data.ratingsAverage} <FaStar className="text-yellow-300" />
              </span>
            </div>
            <p className="mt-5"><span className="text-green-700 dark:text-[#c8550d]">stocks available:</span> {data.quantity} piece</p>
            </div>
              <span > <AddBtn  id={data.id}/></span>
          </div>
        </div>
      </div>
      </div>
  )
}
