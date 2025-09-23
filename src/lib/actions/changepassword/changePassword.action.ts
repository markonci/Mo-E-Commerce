'use server'

import getMyToken from "@/lib/utilities/getMyToken"
import { changePasswordSChemaType } from "@/schema/changePassword.schema"

export default async function changePassword(values:changePasswordSChemaType) {

    const token =await getMyToken()
    if(!token)throw new Error('Must Be Login')
        const res=await fetch(`${process.env.API}/users/changeMyPassword`,{
    method:'PUT',
    headers:{
        token,
        // ('5las 3rfna any lw alkay nfs asm almot8er aly shayel al vlue bktbo keda')
        'Content-Type': 'application/json'
    },
body:JSON.stringify(values)
})
const payload=await res.json()
if(payload.message!='success')throw new Error(payload.message || "Something went wrong")
return payload
}
