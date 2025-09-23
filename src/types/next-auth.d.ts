/*eslint-disable */
import NextAuth,{User} from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

interface User{
    // User dy inter face b3adl 3laha al user b2olo anta gowak mt5azn a wadtlo kol wa7ed taybe al bulit in aly fe jwt 
    user:{
        name:string,
        email:string,
        role:string
    }
// ('التوكين ضفنا فيه حاجة اسمها  يوزر اليوزر دي  شايل النيم والاميل والرويل ')
    token:string
}


  interface Session {
    user:User['user'] 
  }
}



declare module "next-auth/jwt" {
  interface JWT extends User{
    idToken?: string
  }
}