"use client";
import getProductCart from "@/lib/actions/cardActions/getProductCart.action";
import { createContext, useEffect, useState, ReactNode } from "react";

interface Product {
  count: number;
}

interface CartResponse {
  status: string;
  data: {
    products: Product[];
  };
}

interface CartContextType {
  numperofcartItem: number;
  setnumperofcartItem: React.Dispatch<React.SetStateAction<number>>;
    getUserCart: () => Promise<void>; // 👈 لازم تضيف دي عشان انت بتمررها في value

}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numperofcartItem, setnumperofcartItem] = useState<number>(0);

  async function getUserCart() {
    try {
      const res: CartResponse = await getProductCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product) => {
          sum += product.count;
        });
        setnumperofcartItem(sum);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return <CartContext.Provider value={{ numperofcartItem, setnumperofcartItem,getUserCart }}>{children}</CartContext.Provider>;
}

