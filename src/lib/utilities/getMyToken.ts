"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  try {
    const decodeToken =
      (await cookies()).get(`next-auth.session-token`)?.value ||
      (await cookies()).get(`__Secure-next-auth.session-token`)?.value;
    // dy bktbha 3lshan ybda t3amel lma arf3 3la alserver al awlneya lL local

    if (!decodeToken) return null;
    const token = await decode({
      token: decodeToken,
      secret: process.env.AUTH_SECRET!,
    });
    // ("!العلامة دي معناه بقولو لا انا متاكد اني هي هتيجي مش هتيجي باندفيند دي حاجة ليها علاقة بالتايب")
    return token?.token || null;
  } catch (err) {
    return null;
  }
}
