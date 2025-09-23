
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { jwtDecode } from "jwt-decode";


export const authOptions : NextAuthOptions={
    // authOptionsmmkn asmeha ay asm 
    pages:{
        signIn:'/login'
    },
    providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                email:{}, 
                password:{},
            },
            authorize :async (credentials)=>{
                // hna bstlm al object aly fe al fe email w alpssword aly al user hyd5lo
                const res=await fetch(`${process.env.API}/auth/signin`,{
                    // process.env.API dy alt2rea alu bngep beha al api aly 3mlnah fe env
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }), 
                    // hna mb3tnash credentials 3ltol fe() alfdal kdea n7dd a7na 3awzen mnaha a 3lshan ndman ay aly hytb3t bl lzbt y3any 
                    // dh al als7
                    headers: { "Content-Type": "application/json" }
                    // w hna next auth aktar aman fa hna ana b2ol ll back end anta htgelk data mn no3 json
                })
                const payload=await res.json()
                // w hna stlmna al res aly gay mn fetch w 7wlnah l json 
                // console.log(payload);
                
                // console.log(decodedtoken);

                // ----------start return authorize----------
                if(payload.message==='success'){
                    const decodedToken: {id:string} = jwtDecode(payload.token);
                    // dy tool package thbtnhaa bt5lena nofk al token w na5od mno mslan id 3lshan authorize mtz3lsh
                    // console.log('mytoken',decodedtoken);
                    
                    return {
                        id:decodedToken.id,
                        user:payload.user,
                        token:payload.token
                    }
                }
                else{
                    throw new Error(payload.message||'wrong credentials')
                }
                // w hna authorize lazem trg3 ya null | res | throw New  error
                // ----------end return authorize----------
            }
        })
    ],
    callbacks:{
            async jwt({ token, user }) {
                if(user){
                    token.user=user?.user;  //name ,email ,role
                    token.token=user?.token;
                    
                    // token.token dy msh m3anah ana bageb  7aga mn  gowha l2 ana btdef property 3elha w b5ezn fe aly 3awz a5zno 
                    // user alawlna di shalya alobject kolo fa b2olo user .user y3any hat mn gowha al user a dh al object kolo w hakaza fe altoken w 
                    // b5znoham fe al porparty al 3amlo
                }
      return token;
    },

     async session({ session,token }) {
        session.user=token.user;
      return session
    },
    }
} 
