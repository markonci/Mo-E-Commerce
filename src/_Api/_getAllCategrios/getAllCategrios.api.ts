
export default async function getAllCategrios() {
  const res = await fetch(`${process.env.API}/categories`);
  const data = await res.json();
    
  return data;

}
