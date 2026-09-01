import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopDashboardSidebar from "../../components/Shop/Layout/ShopDashboardSidebar";
import DashBoardMessages from "../../components/Shop/DashBoardMessages.jsx";
const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <ShopDashboardSidebar active={8} />
        </div>
        <DashBoardMessages />
      </div>
    </div>
  );
};

export default ShopInboxPage;