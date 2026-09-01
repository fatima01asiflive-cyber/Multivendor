import { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/style";
import ProfileSideBar from "../components/profile/ProfileSideBar";
import ProfileContent from "../components/profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-12.5 800px:w-[335px] sticky mt-[18%] 800px:mt-0">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;