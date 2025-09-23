'use server'

import { forgotpasswordType } from "@/schema/(rest Password)/forgotpassword.schema"

export default async function forgotPasswordaction(values:forgotpasswordType) {
const res =await fetch(`${process.env.API}/auth/forgotPasswords`,{
    method:'POST',
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(values)
})
const payload= await res.json()
if(payload.statusMsg!='success')throw new Error("can't send email ")
return payload
}
