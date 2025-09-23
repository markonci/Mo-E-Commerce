
export default async function getAllProducts(searchParams?: URLSearchParams) {
  const priceGte = searchParams?.get("price[gte]");
  const sort = searchParams?.get("sort");

  const url = `${process.env.API}/products${
    priceGte || sort
      ? "?" +
        [
          priceGte ? `price[gte]=${priceGte}` : "",
          sort ? `sort=${sort}` : "",
        ].filter(Boolean).join("&")
      : ""
  }`;

  const res = await fetch(url);
  const { data } = await res.json();
  return data;
}