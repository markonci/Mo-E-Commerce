'use server'

import getMyToken from '@/lib/utilities/getMyToken'
import { CheckOutschemaType } from '@/schema/CheckOut.schema'

export default async function CheckoutCash(cartId:string,formvalues:CheckOutschemaType) {
const token = await getMyToken()
if(!token)throw new Error('must be Login')
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        method:'POST',
        headers:{token,
                "Content-Type": "application/json",
        },
        body:JSON.stringify({shippingAddress:formvalues})
    })
    const payload=await res.json()
        if(payload.status!="success")throw new Error("can't pay now!!")
    return payload
}
