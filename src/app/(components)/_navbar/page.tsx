"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useContext } from "react";
import { TiShoppingCart } from "react-icons/ti";
import Togledarkmode from "../_dark-mode/_togledark-mode/page";
import Sheetcart from "../_sheet-modle/_sheet-cart/page";
import Sheetwishlist from "../_sheet-modle/_sheet-Wishlist/page";
import Sheetsort from "../_sheet-modle/_sheet-sort/page";
// import Togledarkmode from "../_dark-mode/_togledark-mode/page";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge"
import { CartContext } from "@/context/CartContext";
// import toast from "react-hot-toast";
// import getProductWishlist from "@/lib/actions/wishlistActions/getProductWishlist.action";
// import { Product } from "@/types/product.type";
import { WishlistContext } from "@/context/WishlistContext";
import { TbTruckDelivery } from "react-icons/tb";


export default function Navbar() {
          const {wishlistCount}=useContext(WishlistContext)!
        
        //--------- start context ------------
        const{numperofcartItem} =useContext(CartContext)!
        //--------- end context ----------------

        const { data: session } = useSession();
        // console.log(session);
        // console.log(status);
        // ('الداتا دي اتعملها لقب اسمه سيشن')
        
  function Signout() {
    signOut({ callbackUrl: "/login" });
  }

  const path = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [ddOpen, setDdOpen] = useState(false); // dropdown
  const ddRef = useRef<HTMLDivElement | null>(null);

  // إغلاق الدروب داون لما تضغط برا
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setDdOpen(false);
      }

    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);




  return (
    <nav className="dark:bg-amber-900 bg-sky-300 p-4 sticky outline-amber-200 top-0 z-50 mb-0 pb-0">
      {/* -------start Desktop desgin ----------- */}
      <div className="flex items-center justify-between w-[90%] mx-auto gap-0.5">
        {/* ----------------start right section----------- */}
        <div className="flex gap-8 items-center ">
          {/* Logo */}
          <div className="dark:text-amber-300 text-white font-bold  max-md:text-[14px] items-center dark:hover:text-white hover:text-black ">
            <Link href="/" className="flex gap-3 items-center">
              {" "}
              <TiShoppingCart className="text-[30px] md:text-5xl" />
              <span className="md:text-[25px]"> Mo E-Commerce</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6">
            <li>
              <Link
                href="/"
                className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                  path === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            {session && (
              <>
                <li>
                
                  <Link
                    href="/cart"
                    className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black relative ${
                      path === "/cart" ? "active" : ""
                    }`}
                  >
                    Cart {numperofcartItem>0&&<Badge className="absolute top-[-11px] font-bold end-[-16px] size-[23px]">{ `+${numperofcartItem}`}</Badge>}
                  </Link>
                </li>
              </>
            )}
            {session && (
              <>
                <li>
                  <Link
                    href="/wishlist"
                    className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black relative ${
                      path === "/wishlist" ? "active" : ""
                    }`}
                  >
                    Wishlist {wishlistCount>0&&<Badge className="absolute top-[-12px] font-bold end-[-14px] size-[23px]">{ `+${wishlistCount}`}</Badge>}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                href="/products"
                className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                  path === "/products" ? "active" : ""
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                  path === "/categories" ? "active" : ""
                }`}
              >
                Categoris
              </Link>
            </li>
            <li>
              <Link
                href="/brands"
                className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                  path === "/brands" ? "active" : ""
                }`}
              >
                Brands
              </Link>
            </li>
          </ul>
        </div>
        {/* -------end Desktop desgin ----------- */}
        {/* ----------------end right section----------- */}

        {/* Right side: Dropdown + Mobile Toggle */}

        <div className="flex items-center  md:gap-4 ">
          {session && (
            <span className="max-md:hidden capitalize">
              <span className="dark:text-amber-300 text-green-500 font-bold">
                Hi,{" "}
              </span>{" "}
              mr. {session?.user?.name}
            </span>
          )}
          {session && (
            <>
              {/* Dropdown */}
              <div className="relative z-50" ref={ddRef}>
                <button
                  onClick={() => setDdOpen(!ddOpen)}
                  className="flex items-center cursor-pointer  gap-2 bg-white/10 px-3 py-1 rounded-md text-amber-300 hover:bg-white/20"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-blue-600 font-bold">
                    {session?.user?.name.charAt(0).toUpperCase()}
                    {/* 3lshan a5od awal 7rf w ykon captel 7ta how lw gay small */}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transform ${
                      ddOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {ddOpen && (
                  <div className="absolute right-0 mt-2 w-48 dark:bg-black bg-white rounded-md shadow-md overflow-hidden">
                    <span className="block py-2 text-sm text-green-700 font-semibold dark:text-[#c8550d] hover:bg-gray-100 pe-4 ps-1">
                      {session?.user?.email}
                    </span>
                    <Link href='/allorders' className="block py-2 text-sm text-green-700 font-semibold dark:text-[#c8550d] hover:bg-gray-100 pe-4 ps-1">
                      <span className='flex gap-2 items-center'>User Orders --⏩ <TbTruckDelivery className='text-[20px]'/></span>
                    </Link>
                      <Link href='/changepassword' className="block py-2 text-sm text-green-700 font-semibold dark:text-[#c8550d] hover:bg-gray-100 pe-4 ps-1">
                        Changepassword🔑
                      </Link>
                      <Link href='/update-logged-user-data' className="block py-2 text-sm text-green-700 font-semibold dark:text-[#c8550d] hover:bg-gray-100 pe-4 ps-1">
                        Update Logged Data ℹ
                      </Link>
                    <button
                      onClick={Signout}
                      className="w-full text-left px-4 py-2 text-sm text-green-700 font-semibold dark:text-[#c8550d] hover:bg-gray-100 cursor-pointer"
                    >
                      Sign out ❕
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-amber-300"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 mt-4">
          <li>
            <Link
              href="/"
              className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                path === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          {session && (
            <li>
              <Link
                href="/cart"
                className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                  path === "/cart" ? "active" : ""
                }`}
              >
                Cart
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link
                href="/wishlist"
                className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                  path === "/wishlist" ? "active" : ""
                }`}
              >
                Wishlist
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/products"
              className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                path === "/products" ? "active" : ""
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                path === "/categories" ? "active" : ""
              }`}
            >
              Categoris
            </Link>
          </li>
          <li>
            <Link
              href="/brands"
              className={`dark:text-amber-300 text-white dark:hover:text-white hover:text-black ${
                path === "/brands" ? "active" : ""
              }`}
            >
              Brands
            </Link>
          </li>
        </ul>
      )}
      {/*------------- start sheet modle cart and wishlist and sort----------------*/}
      <div>
        <ul className="flex gap-4 items-center justify-end">
          {session && (
            <>
              <li className="border-e-2 pe-4">
                <Sheetcart />
              </li>
              <li>
                <Sheetwishlist length={wishlistCount} />
                {/* hna b3tlo al length ka props */}
              </li>
            </>
          )}
          {/* ------------start dark mode----------------  */}
          {!session && (
            // ('هنا بقولو لو السيشن مش موجودة اعرضهم ')
            <div className=" gap-2 md:gap-4 flex">
              <Link href="/login">Login</Link>|
              <Link href="/register">Register</Link>
            </div>
          )}
          <Togledarkmode />
          {/* ---------------end dark mode---------------  */}
        </ul>

        {/* ----------start sort -------------- */}
        <Sheetsort />
        {/* ----------endF sort -------------- */}
      </div>
      {/*------------- end sheet modle cart and wishlist and sort----------------*/}
    </nav>
  );
}
