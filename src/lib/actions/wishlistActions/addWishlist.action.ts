'use server'
import getMyToken from "../../utilities/getMyToken"

export default async function addTowishlist(id:string) {
    const token= await getMyToken()
    if(!token){
        throw new Error('please login to able add products')
    }


const res= await fetch(`${process.env.API}/wishlist`,{
method:'POST',
   
headers:{
    // token:token,
    token,
    // mmkn aktbha kda adam nfs alasm
        "Content-Type": "application/json",
},
body:JSON.stringify({
    productId:id
})
})
const payload = await res.json();
if(payload?.status!='success'){
throw new Error(payload.message|| "Failed to add product to wishlist")
}
return payload
}
