'use server'
import getMyToken from "@/lib/utilities/getMyToken"

export default async function getProductCart() {
const token = await getMyToken()
if(!token){
    throw new Error(`please login to able Show products cart`)
}

    const res=await fetch(`${process.env.API}/cart`,{
        method:'GET',
        headers:{
                token,
                        "Content-Type": "application/json",

        }
    })
    const payload=await res.json()
    if(payload.status!='success'){
        throw new Error(`Failed to get product from cart`)
    }
    return payload
}
