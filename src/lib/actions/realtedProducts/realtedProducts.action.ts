'use server'

export default async function getRealtedProducts(catId:string) {
    const res=await fetch(`${process.env.API}/products?category[in]=${catId}`)
    const payload=await res.json()
    return payload
}
