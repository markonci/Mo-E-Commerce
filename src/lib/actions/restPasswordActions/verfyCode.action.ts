'use server'

import { verfyCodeType } from "@/schema/(rest Password)/verfyCode.schema"

export default async function verfyCodeAction(values:verfyCodeType) {
const res =await fetch(`${process.env.API}/auth/verifyResetCode`,{
    method:'POST',
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(values)
})
const payload= await res.json()
if(payload.status!='Success')throw new Error("can't verfy code ")
return payload
}
