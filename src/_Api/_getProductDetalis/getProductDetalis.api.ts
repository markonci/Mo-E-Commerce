interface Product {
  id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  ratingsAverage: number;
  quantity: number;
}

interface ProductResponse {
  status: string;
  data: Product;
}

export default async function getProductDetalis( id:string ):Promise<ProductResponse> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  const data =  await res.json();
//   console.log(data);
  return data;
  
}
