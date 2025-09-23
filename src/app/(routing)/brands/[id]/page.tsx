import React from 'react'
import getDetalisBrands from '@/_Api/_getspecificbrand/getspecificbrand';


export const metadata = {
  title: "Brands Detalis",
  // description: "دي صفحة تجريبية بالـ App Router",
};

export default async function Getdetalisbrands({params}:{params:Promise<{id:string}>}) {
    const {id}= await params
    // console.log(id);
    

      const  {data}  = await getDetalisBrands(id);
      // console.log(data);
      
    
  return (
    <>
    <div className='bg-[url(/3409297.jpg)] dark:bg-[url(/fht6.jpg)] bg-cover flex text-[#74D4FF]  dark:text-white flex-col items-center bg-opacity-20 bg-center min-h-dvh'>
        {data.name&&<p className='text-4xl ms-5 pt-5 font-bold'>{data?.name} Brand:</p>}
          <h2 className='text-center text-4xl font-bold pt-9'>products coming soon!!</h2>
    </div>
    </>
  )
}

