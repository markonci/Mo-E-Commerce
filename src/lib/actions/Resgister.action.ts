"use server";

import { registerSchemaType } from "@/schema/register.schema";

export async function RegisterAction(values: registerSchemaType) {

    const payload = JSON.stringify(values);

    const res = await fetch(`${process.env.API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    const data = await res.json();
    if(data.message!='success'){
        throw new Error(data.message)
        // hna bb3t al message aly htt3rd fe al catch aly fe alcomponent
    }

    return data;
}
