'use server'
export default async function getAllBrands() {
  const res = await fetch(`${process.env.API}/brands`);
  const data = await res.json();
    
  return data;

}
