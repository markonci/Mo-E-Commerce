'use server'
import getMyToken from "@/lib/utilities/getMyToken";

export default async function updateCartCount(id: string,count:number) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login to able update count");
  }

  const res = await fetch(
    `${process.env.API}/cart/${id}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        //   count:count
          count,
        // ('ممكن ابعتها كدة او كدة')
    //   ('دي الي هبعتهالو لما انادي علي الفانكشن')
      })
    }
  );
  const payload= await res.json()
  if(payload.status!='success'){
    throw new Error(payload.message || "i can't update this item")
  }
  
  return payload
}
