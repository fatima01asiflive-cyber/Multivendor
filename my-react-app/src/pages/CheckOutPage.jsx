import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Checkout from "../components/CheckOut/CheckOut";
import CheckoutSteps from "../components/CheckOut/CheckOutStep";

const CheckOutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />

      <Footer />
    </div>
  );
};

export default CheckOutPage;