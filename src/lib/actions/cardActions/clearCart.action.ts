'use server'
import getMyToken from "@/lib/utilities/getMyToken";

export default async function clearCart() {
const token =await getMyToken()
if(!token)  throw new Error("please login to able update count");
// (`قدام سطر واحد ممكن اكتبها كدة `)
const res =await fetch(`${process.env.API}/cart`,{
    method:'DELETE',
    headers:{
        token,
        "Content-Type": "application/json",
    }
})
const payload=await res.json()
if(payload?.message!='success') throw new Error(payload.message||'clear faild!!')
    return payload
}
