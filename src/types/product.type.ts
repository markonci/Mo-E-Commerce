export interface Product {
  id: string;
  imageCover: string;
  images: string[];
  title: string;
  category: {
    name: string;
  };
  price: number;
  ratingsAverage: number;
}