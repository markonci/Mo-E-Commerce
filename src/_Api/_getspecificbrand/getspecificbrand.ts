'use server'
export default async function getDetalisBrands(id:string) {
  const res = await fetch(`${process.env.API}/brands/${id}`);
  const data = await res.json();

  return data;

}
