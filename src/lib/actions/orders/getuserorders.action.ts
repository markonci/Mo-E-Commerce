'use server'

import getMyToken from "@/lib/utilities/getMyToken"
import { jwtDecode } from "jwt-decode"
type DecodedToken = {
  id: string;
  iat?: number;
  exp?: number;
};

export default async function getuserorders() {
    const token=await getMyToken()
    if(!token) {
        return
    }
    // ("لو محطتهاش هيضيرب ايرور تايب علشان مش عارف التوكين هيجي ولا لا")
    const {id} = jwtDecode<DecodedToken>(token);
        
        const res=await fetch(`${process.env.API}/orders/user/${id}`,{
            method:'GET',
            headers:{
                'Content-type': 'application/json'
            }
        })
        const payload=await res.json()
        return payload
}
