export interface Brand  {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string; // ممكن يكون Date لو هتحولها
  updatedAt: string; // ممكن يكون Date
};

export interface BrandsResponse  {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number; // ممكن تكون موجودة أو لا
  };
  data: Brand[];
};
