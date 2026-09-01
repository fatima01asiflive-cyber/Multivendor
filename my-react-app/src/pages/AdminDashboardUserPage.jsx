import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllUsers from "../components/Admin/AllUsers.jsx";
const AdminDashboardUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="800px:w-[330px] w-20">
          <AdminSidebar active={4} />
        </div>
        <AllUsers />
      </div>
    </div>
  );
};
export default AdminDashboardUsersPage;