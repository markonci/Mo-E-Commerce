'use client'
import getProductWishlist from "@/lib/actions/wishlistActions/getProductWishlist.action";
import { createContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface WishlistItem {
  id:  string; 
  name?: string;
}

interface WishlistContextType {
  wishlistCount: number;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
  myhandleWishlist: () => Promise<void>;
  myProduct: WishlistItem[];
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

interface WishlistContextProviderProps {
  children: ReactNode;
}

export default function WishlistContextProvider({ children }: WishlistContextProviderProps) {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [myProduct, setMyProduct] = useState<WishlistItem[]>([]);

  async function myhandleWishlist(): Promise<void> {
    try {
      // -----------start call api-----------
      const data = await getProductWishlist();
      // -----------end call api-----------

      if (data.status === "success") {
        setWishlistCount(data.data.length);
        setMyProduct(data.data);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "can't fetch data");
    }
  }

  //---------- end fn get cart --------------

  useEffect(() => {
    myhandleWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        setWishlistCount,
        myhandleWishlist,
        myProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
