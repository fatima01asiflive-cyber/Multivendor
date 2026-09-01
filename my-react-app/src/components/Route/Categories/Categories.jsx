import { useMemo } from "react";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.products);

  const data = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    return [...allProducts]
      .sort((a, b) => b.sold_out - a.sold_out)
      .slice(0, 5);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12 border-0">
          {data && data.length !== 0 && (
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default BestDeals;