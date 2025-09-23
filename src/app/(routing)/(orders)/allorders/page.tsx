import { Button } from '@/components/ui/button'
import getuserorders from '@/lib/actions/orders/getuserorders.action'
import { Order } from '@/types/userorders.Type'
import Link from 'next/link'
import React from 'react'

export default async function Userorders() {
  const product:Order[] = await getuserorders()
  if(!product){
      return <div>You must be logged in to view orders.</div>
}
  
  return (
    <>
      {product.length > 0 ? (
        <div className="dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
          <div className="container w-full md:w-[80%] mx-auto pt-12">

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Total Order Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4"># {item.id}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.totalOrderPrice} EGP
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/allorders/${item._id}`}>
                          <Button className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-6 md:hidden p-4">
              {product.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col gap-3">
                  <p className="font-bold text-gray-900 dark:text-white"># {item.id}</p>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    Total Price: {item.totalOrderPrice} EGP
                  </p>
                  <Link href={`/allorders/${item._id}`}>
                    <Button className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      ) : (
        <h2 className="text-center text-red-500 font-bold text-5xl pt-7 dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
          no products added yet!🤷‍♂️
        </h2>
      )}
    </>
  )
}
