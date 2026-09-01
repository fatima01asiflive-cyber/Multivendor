import { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const data = eventData !== null
    ? allEvents && allEvents.find((i) => i._id === id)
    : allProducts && allProducts.find((i) => i._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, eventData]);

  return (
    <div>
      <Header />
      <br />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <br />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;