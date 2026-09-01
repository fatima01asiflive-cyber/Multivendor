import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopDashboardSidebar from "../../components/Shop/Layout/ShopDashboardSidebar";
import AllRefundOrders from "../../components/Shop/AllRefundOrders";
const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <ShopDashboardSidebar active={10} />
        </div>
        <div className="w-full flex justify-center">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;