import React from 'react';
import getordersDetalis from '@/lib/actions/orders/getordersDetalis.action';
import { TbTruckDelivery } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";
import Image from 'next/image';
import {  OrdersDetalisResponse } from '@/types/userorders.Type';
import dayjs from './../../../../../../node_modules/dayjs/esm/index';

export default async function USerorderdetalis({ params }:{params:Promise<{id:string}>}) {
    const { id } = await params;
        //  console.log(id);

    const product:OrdersDetalisResponse = await getordersDetalis(id);
            // console.log(product);

    // console.log(product.data[0].cartItems);
        // (ana kdea mask awal 3nsr fe alarry . 3lshan abd2 amsk aly gowha)
        // console.log(product.data[0].user);
        // console.log(product.data[0].shippingAddress.city);
        
        // console.log(product.data[0].id);
        // console.log(product.data[0].totalOrderPrice);
        // console.log(product.data[0].paymentMethodType);
        // console.log(product.data[0].isDelivered);
        // console.log(product.data[0].taxPrice);
        // console.log(product.data[0].shippingPrice);
    const products = product.data[0].cartItems;
    // (' dh alarry aly bmap 3leh 3la products')


    return (
        <div className="dark:bg-[url(/fht6.jpg)] bg-[url(/3409297.jpg)] bg-cover bg-opacity-20 bg-center min-h-dvh">
            <div className="container w-full md:w-[80%] mx-auto pt-12">

                {/* Order, Address, Customer Info */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl'>
                    {/* Order Info */}
                    <div className='space-y-2'>
                        <h2 className='font-bold text-2xl flex items-center gap-2 text-green-700 dark:text-[#c8550d]'>
                            Order Info <TbTruckDelivery className='text-[30px]' />
                        </h2>
                        <p><span className='font-bold'>Order ID:</span> <span className='text-green-700 dark:text-[#c8550d]'>#{product.data[0].id}</span></p>
                        <p><span className='font-bold'>Total Payment Price:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].totalOrderPrice}</span> EGP</p>
                        <p><span className='font-bold'>Payment Method:</span> <span className='bg-red-300 rounded-[8px] p-[3px] items-center'>{product.data[0].paymentMethodType}</span></p>
                        <p><span className='font-bold'>Tax:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].taxPrice} EGP</span></p>
                        <p><span className='font-bold'>Delivered:</span> <span className='text-green-700 dark:text-[#c8550d]'>No</span></p>
                        <p><span className='font-bold'>Paid:</span> <span className='text-green-700 dark:text-[#c8550d]'>No</span></p>
                        <p><span className='font-bold'>Shipping:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].shippingPrice} EGP</span></p>
                        <p><span className='font-bold'>Ordered on:</span> <span className='text-green-700 dark:text-[#c8550d]'>{dayjs(product.data[0].createdAt).format('DD/MM/YYYY')} </span></p>
                    </div>

                    {/* Address Info */}
                    <div className='space-y-2'>
                        <h2 className='font-bold text-2xl flex items-center gap-2 text-green-700 dark:text-[#c8550d]'>
                            Address Info <LuMapPin className='text-[30px]' />
                        </h2>
                        <p><span className='font-bold'>City:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].shippingAddress.city}</span></p>
                        <p><span className='font-bold'>Details:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].shippingAddress.details}</span></p>
                        <p><span className='font-bold'>Phone:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].shippingAddress.phone}</span></p>
                    </div>

                    {/* Customer Info */}
                    <div className='space-y-2'>
                        <h2 className='font-bold text-2xl flex items-center gap-2 text-green-700 dark:text-[#c8550d]'>
                            Customer Info <FaIdCard className='text-[30px]' />
                        </h2>
                        <p><span className='font-bold'>Name:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].user.name}</span></p>
                        <p><span className='font-bold'>Email:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].user.email}</span></p>
                        <p><span className='font-bold'>Phone:</span> <span className='text-green-700 dark:text-[#c8550d]'>{product.data[0].user.phone}</span></p>
                    </div>
                </div>

                {/* Products Table for md+ */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden md:block pt-12">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3 text-green-700 dark:text-[#c8550d] font-bold">Image</th>
                                <th scope="col" className="px-16 py-3 text-green-700 dark:text-[#c8550d] font-bold">Product</th>
                                <th scope="col" className="px-6 py-3 text-green-700 dark:text-[#c8550d] font-bold">Price</th>
                                <th scope="col" className="px-6 py-3 text-green-700 dark:text-[#c8550d] font-bold">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <Image src={product.product.imageCover} alt={product.product.title} width={120} height={120} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.product.title.length > 30
                                            ? product.product.title.slice(0, 30) + "..."
                                            : product.product.title}
                                    </td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-5 py-4">{product.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="grid grid-cols-1 gap-4 md:hidden pt-12">
                    {products.map((product) => (
                        <div key={product.product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex gap-4 items-center">
                            <Image src={product.product.imageCover} alt={product.product.title} width={80} height={80} className="rounded" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    {product.product.title.length > 20
                                        ? product.product.title.slice(0, 30) + "..."
                                        : product.product.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">Price: {product.price} EGP</p>
                                <p className="text-gray-700 dark:text-gray-300">Qty: {product.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
