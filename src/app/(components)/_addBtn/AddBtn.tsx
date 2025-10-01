'use client'
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import addToCart from "@/lib/actions/cardActions/addToCart.action";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaSyncAlt } from "react-icons/fa";


export default  function AddBtn({id}:{id:string}) {
const { numperofcartItem, setnumperofcartItem } = useContext(CartContext)!;
const [isLoding, setisLoding] = useState(false)

     async function handleAddButton(id:string){
      try{
        // start call api 
        setisLoding(true)
        const res=await addToCart(id)
        // end call api 

        if(res.status=='success'){
                  // console.log(res);
                  
                  setisLoding(false)
        toast.success(`${res.message} 👌`,{
          position:"top-left",
          duration:3000
        })
        setnumperofcartItem(numperofcartItem+1)

        }
        
      }
      catch(err){
        // console.log(err);
        
        setisLoding(false)
        toast.error(err instanceof Error ? err.message : `i'cant add this product`)
        // ('الاول مكنش بيخش فيه علشان هو كمان كان عاوز هناك ثرو ايرور')

        
      }
    }
  return (
    <>
    <Button disabled={isLoding} onClick={()=>handleAddButton(id)} className="w-full dark:bg-[#c8550d] dark:hover:bg-red-300  bg-green-400 mt-5 cursor-pointer">
        {isLoding?<FaSyncAlt className="dark:text-white disabled:cursor-no-drop text-black animate-spin"/>:'Add To Cart'}
      </Button>
    </>
  );
}
