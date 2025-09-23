'use server'

import { restpasswordType } from "@/schema/(rest Password)/restpassword.schema"

export default async function restPassword(value:restpasswordType) {
    const res=await fetch(`${process.env.ApI}/auth/resetPassword`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(value)
    })
    const payload= await res.json()
    if(payload.statusMsg==='fail')throw new Error(payload.message)

    return payload
}
