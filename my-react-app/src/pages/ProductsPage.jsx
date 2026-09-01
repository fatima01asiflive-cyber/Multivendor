import { useMemo } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
const ProductsPage = () => {
  const [SearchParams] = useSearchParams();
  const { allProducts } = useSelector((state) => state.products);
  const categoryData = SearchParams.get("category");

  const data = useMemo(() => {
    if (!allProducts) return [];

    if (categoryData === null) {
      return [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
    }

    return [...allProducts].filter((i) => i.category === categoryData);
  }, [allProducts, categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12">
          {data &&
            data.map((i, index) => {
              return <ProductCard data={i} key={index} />;
            })}
          {data && data.length === 0 ? (
            <h1 className="text-center w-full capitalize pb-25 text-[20px]">
              No products found !
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;