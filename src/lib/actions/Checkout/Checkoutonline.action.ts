'use server'

import getMyToken from "@/lib/utilities/getMyToken"
import { CheckOutschemaType } from "@/schema/CheckOut.schema"


export default async function Checkoutonline(cartId:string,formvalues:CheckOutschemaType) {
const token = await getMyToken()
if(!token)throw new Error('Must Login')
        const baseUrl =  process.env.NEXTAUTH_URL || "http://localhost:3000";
     const res=await fetch(`${process.env.API}/${cartId}?url=${baseUrl}`,{
    method:'POST',
    headers:{token,
            "Content-Type": "application/json",
},
body:JSON.stringify({shippingAddress:formvalues})

}) 
const payload= await res.json()
        if(payload.status!="success")throw new Error("can't pay now!!")
return payload
}
