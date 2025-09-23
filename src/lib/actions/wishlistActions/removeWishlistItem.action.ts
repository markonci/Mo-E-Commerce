'use server'
import getMyToken from "@/lib/utilities/getMyToken";

export default async function removeWishlistItem(id:string) {
  const token = await getMyToken();
  if (!token) throw new Error("please login to able remove item ");
  const res = await fetch(`${process.env.API}/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await res.json();
  if(payload.status!='success'){
    throw new Error("can't remove this item")
  }
  return payload;
}
