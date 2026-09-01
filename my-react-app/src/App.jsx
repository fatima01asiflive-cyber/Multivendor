import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Importing local routes
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  BestSelling,
  Events,
  CheckOutPage,
  PaymentPage,
  FaqPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderSuccessPage,
  OrderDetailPage,
  TrackOrderPage,
  ShopAllRefundsPage,
  UserInboxPage,
} from "./routes/Routes.jsx";

import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
// import Shop Routes
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopPreviewPage,
  ShopAllCoupons,
  ShopAllOrders,
  ShopOrderDetails,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes.js";
import {
  AdminDashboardPage,
  AdminDashboardUsersPage,
  AdminDashboardSellerPage,
  AdminDashboardOrdersPage,
  AdminDashboardProductsPage,
  AdminDashboardEventsPage,
  AdminDashboardWithdrawPage,
} from "./routes/AdminRoutes.js";

import { getUser } from "./redux/actions/user";
import { getSeller } from "./redux/actions/seller";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import axios from "axios";
import { server } from "./server.js";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute.jsx";
import { useDispatch } from "react-redux";
const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const getStripeApikey = async () => {
      try {
        const { data } = await axios.get(`${server}/payment/stripe-api-key`);
        if (isMounted) {
          setStripeApiKey(data?.stripeapikey);
        }
      } catch (error) {
        toast.error("Error fetching Stripe API key:", error);
      }
    };

    dispatch(getUser());
    dispatch(getSeller());
    dispatch(getAllProducts());
    dispatch(getAllEvents());
    getStripeApikey();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {/* Adding the Payment  Page + Stripe Route  */}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}

        <Routes>
          {/* Mounting User Routes Routes*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <UserInboxPage />
              </ProtectedRoute>
            }
          />
          {/* User Order Details Page  */}
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />
          {/* Track Order */}
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          {/* User Supported Route */}
          {/* Adding the CheckOut Page */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
          {/* Mounting Shop Routes */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefundsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          {/* Seller order Details Page  */}
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          {/* Withdraw Money */}
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          {/* Seller DashBoard Messages */}
          <Route
            path="/dashboard-messages"
            element={
              <ProtectedRoute>
                <ShopInboxPage />
              </ProtectedRoute>
            }
          />
          {/* Order SuccessPage */}
          <Route path="/orders/success" element={<OrderSuccessPage />} />
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellerPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrdersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProductsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEventsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardWithdrawPage />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        transition={Bounce}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;