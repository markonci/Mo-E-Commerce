

  
  export interface Params {
  id: string;
}

export interface ProductDetailsProps {
  params: Params;
}

export interface Product {
    id: string; 
      title: string;
  description: string;
  category: { name: string;
    _id:string

  };
  price: number;
  ratingsAverage: number;
  quantity: number;
  imageCover?: string;
  images?: string[];
}