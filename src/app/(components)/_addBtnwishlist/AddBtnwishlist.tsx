"use client";
import { WishlistContext } from "@/context/WishlistContext";
import addTowishlist from "@/lib/actions/wishlistActions/addWishlist.action";
import removeWishlistItem from "@/lib/actions/wishlistActions/removeWishlistItem.action";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";




export default function AddBtnwishlist({ id }: { id: string }) {
  const { myhandleWishlist, myProduct } = useContext(WishlistContext)!;
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Ensure WishlistItem type includes _id property
  interface WishlistItem {
    _id: string;
    // add other properties if needed
  }

  // تحقق هل المنتج موجود في الليست ولا لا
  useEffect(() => {
    if ((myProduct as unknown as WishlistItem[])?.some((product) => product._id === id)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [myProduct, id]);

  async function toggleWishlist(id: string) {
    try {
      setIsLoading(true);

      if (isInWishlist) {
        // لو موجود → نحذفه
        const res = await removeWishlistItem(id);
        if (res.status === "success") {
          toast.success(res.message, { position: "top-left" ,duration:3000});
          await myhandleWishlist(); // تحديث الكونتكست
        }
      } else {
        // لو مش موجود → نضيفه
        const res = await addTowishlist(id);
        if (res.status === "success") {
          toast.success(res.message, { position: "top-left",duration:3000});
          await myhandleWishlist();
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'you must login first');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      className="cursor-pointer ms-auto text-3xl me-2 my-3"
      onClick={() => toggleWishlist(id)}
    >
      {isLoading ? (
        <FcLikePlaceholder className="animate-pulse" />
      ) : isInWishlist ? (
        <FcLike />
      ) : (
        <FcLikePlaceholder />
      )}
    </button>
  );
}







// 'use client'
// import { Button } from "@/components/ui/button";
// import { CartContext } from "@/context/CartContext";
// import { WishlistContext } from "@/context/WishlistContext";
// import addTowishlist from "@/lib/actions/wishlistActions/addWishlist.action";
// import getProductWishlist from "@/lib/actions/wishlistActions/getProductWishlist.action";
// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { FaSyncAlt } from "react-icons/fa";
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";


// export default  function AddBtnwishlist({id}:{id:string}) {
//   // const [curentid, setcurentid] = useState('')
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   let {myhandleWishlist,myProduct}=useContext(WishlistContext)
// const [isLoding, setisLoding] = useState(false)

// async function handleaddBtnwishlist(id:string){
//       try{
//         // start call api 
//         setisLoding(true)
//         const res=await addTowishlist(id)
//         // end call api 
// // console.log(res);
// // setcurentid(id)

          

//         if(res.status=='success'){
//                   // console.log(res);
//                    myhandleWishlist()
//                   setisLoding(false)
//         toast.success(`${res.message} 👌`,{
//           position:"top-left",
//           duration:3000
//         })

//         }
        
//       }
//       catch(err){
//         // console.log(err);
        
//         setisLoding(false)
//         toast.error(`i'cant add this product`)
//         // ('الاول مكنش بيخش فيه علشان هو كمان كان عاوز هناك ثرو ايرور')

        
//       }
//     }
//     myProduct.map((product)=>{
//       console.log(product._id);

//     })
    
//   return (
//     <>
//           {/* {curentid===} */}

//                 <button disabled={isLoding} className="cursor-pointer ms-auto text-3xl me-2 my-3" onClick={()=>handleaddBtnwishlist(id)} >
//                   {isLoding?<FcLikePlaceholder className="animate-pulse"/>:<FcLike />}
//                 </button>
//     </>
//   );
// }
