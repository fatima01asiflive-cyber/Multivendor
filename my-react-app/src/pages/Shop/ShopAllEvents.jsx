import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopDashboardSidebar from "../../components/Shop/Layout/ShopDashboardSidebar";
import AllEvents from "../../components/Shop/AllEvents";
const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <ShopDashboardSidebar active={5} />
        </div>
        <div className="w-full flex justify-center">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};
export default ShopAllEvents;