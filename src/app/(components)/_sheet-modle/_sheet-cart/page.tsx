import React, { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "@/context/CartContext";

export default function Sheetcart() {
  const { numperofcartItem } = useContext(CartContext)!;

  return (
    <>
      <Sheet>
        <SheetTrigger className="flex items-center gap-2 cursor-pointer relative">
          cart{" "}
          <span>
            <FaShoppingCart />
          </span>{" "}
          {numperofcartItem > 0 && (
            <Badge className="absolute text-center font-bold top-[-14px] end-[-16px] w-[25px] h-[23px] ">{`+${numperofcartItem}`}</Badge>
          )}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>cart</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
