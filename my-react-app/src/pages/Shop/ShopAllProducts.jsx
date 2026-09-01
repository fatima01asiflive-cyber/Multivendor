import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopDashboardSidebar from "../../components/Shop/Layout/ShopDashboardSidebar";
import AllProducts from "../../components/Shop/AllProducts";
const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <ShopDashboardSidebar active={3} />
        </div>
        <div className="w-full flex justify-center">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};
export default ShopAllProducts;