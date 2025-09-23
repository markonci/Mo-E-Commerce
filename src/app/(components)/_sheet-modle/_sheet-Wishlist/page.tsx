"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaHeart } from "react-icons/fa";
import { Badge } from '@/components/ui/badge';


interface SheetwishlistProps {
  length: number;
}


  


export default function Sheetwishlist({length}:SheetwishlistProps) {
  return (
    <Sheet>
  <SheetTrigger className='flex items-center gap-2 cursor-pointer relative'>wishlist <FaHeart/>{length>0&&<Badge className="absolute top-[-12px] font-bold end-[-14px] size-[23px]">{ `+${length}`}</Badge>} </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>wishlist </SheetTitle>
      <SheetDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, deleniti!
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

