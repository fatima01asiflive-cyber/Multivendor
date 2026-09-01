import React from "react";
import ShopDashboardSidebar from "../../components/Shop/Layout/ShopDashboardSidebar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import WithDrawMoney from "../../components/Shop/WithDrawMoney";
const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <ShopDashboardSidebar active={7} />
        </div>
        <WithDrawMoney />
      </div>
      
    </div>
  );
};

export default ShopWithDrawMoneyPage;