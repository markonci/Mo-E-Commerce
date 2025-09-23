import Mainsilder from "./(components)/_mainsilder/Mainsilder";
import Categeriossilder from "./(components)/_categerios-silder/Categeriossilder";
import Products from "./(routing)/products/page";

export const metadata = {
  title: "Home",
  // description: "دي صفحة تجريبية بالـ App Router",
};
export default function Home() {

  return (
    <>

      <div className=" dark:bg-[url(/fht6.jpg)]  bg-[url(/rm314-adj-10.jpg)] bg-cover bg-center">
        <div className="container md:w-10/12  md:mx-auto  ">
      
      <Mainsilder/>
      
      <Categeriossilder/>
      </div>
      <Products/>
      </div>
    </>
  );
}
