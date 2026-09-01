import Header from "../components/Layout/Header";
import styles from "../styles/style";
import Footer from "../components/Layout/Footer";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSelling = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const data = allProducts
    ? [...allProducts].sort((a, b) => (b.sold_out || 0) - (a.sold_out || 0))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSelling;