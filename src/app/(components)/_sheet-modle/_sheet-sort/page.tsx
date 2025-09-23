"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdSettings } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Sheetsort() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";
  const currentPrice = searchParams.get("price[gte]") || "";

  return (
    <Sheet>
      <SheetTrigger className="fixed mt-10 bg-red-400 z-50 ">
        <span className="flex items-center gap-2 cursor-pointer text-green-400 dark:text-yellow-300">
          Sort{" "}
          <IoMdSettings className="animate-spin dark:text-white text-[#74D4FF]" />
        </span>
      </SheetTrigger>

      <SheetContent side="left" className="w-[250px]">
        <SheetHeader>
          <SheetTitle>Sort Options</SheetTitle>
          <div>Choose the appropriate sorting method</div>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <form action="/products" method="GET">
          {/* hna rpto  bal products 3n tar2t action 
          -b3d kdea ro7t hndlt aldanya fe fetch bt3at al products 
          -b3d kdea ntahda fe nav bar b 7yes mttkrash fe alhome w al bodrctus marten fe nafs al components 
          
          */}
            <label className="flex items-center gap-2 cursor-pointer ms-3 mb-4">
              <input
                type="radio"
                name="sort"
                value="price"
                defaultChecked={currentSort === "price"}
                // onChange={(e) => e.currentTarget.form?.submit()}
              />
              Price (low to high)
            </label>
            <label className="flex items-center gap-2 cursor-pointer ms-3 ">
              <input
                type="radio"
                name="sort"
                value="-price"
                defaultChecked={currentSort === "-price"}
                // onChange={(e) => e.currentTarget.form?.submit()}
              />
              Price (high to low)
            </label>

            <input
              type="text"
              name="price[gte]"
              defaultValue={currentPrice}
              placeholder="Min price"
              className="border p-1 rounded w-full my-5 mt-6"
            />
            <div className="flex justify-between mt-5">
              {" "}
              <button
              
                type="button"
                onClick={(e) => {
                  // بدل ما نمسح كل حاجة بالـ inputs، نعمل redirect مباشر
                  window.location.href = "/products";
                }}
                // hna 3mlto lma ados 3leh yms7 kol aly fo2 yktb kda 
                className="ml-2 text-sm text-red-500 cursor-pointer"
              >
                Clear
              </button>
              <Button className="cursor-pointer">submit</Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
