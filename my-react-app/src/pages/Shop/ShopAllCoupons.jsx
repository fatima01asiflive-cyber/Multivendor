import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopDashboardSidebar from "../../components/Shop/Layout/ShopDashboardSidebar";
import AllCoupons from "../../components/Shop/AllCoupons";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <ShopDashboardSidebar active={9} />
        </div>
        <div className="w-full flex justify-center">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};
export default ShopAllCoupons;