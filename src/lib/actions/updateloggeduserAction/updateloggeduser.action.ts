'use server'
import getMyToken from "@/lib/utilities/getMyToken";
import { UpdateLoggedUserSchemaType } from "@/schema/update-logged-user-data.schema";

export default async function updateloggeduser(values:UpdateLoggedUserSchemaType) {
    const token=await getMyToken();
    if(!token)throw new Error('Must Be Login')

        const res= await fetch(`${process.env.API}/users/updateMe/`,{
            method:'PUT',
            headers:{
                token,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)
        })
        const payload=await res.json()
        if(payload.message==='fail')throw new Error(payload.errors.msg||"can't update try again")
        return payload
}
