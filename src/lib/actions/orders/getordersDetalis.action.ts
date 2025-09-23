
export default async function getordersDetalis(id:string) {
 const res=await fetch(`${process.env.API}/orders?_id=${id}`,{
            method:'GET',
            headers:{
                'Content-type': 'application/json'
            }
        })
        const payload=await res.json()
        return payload
}
