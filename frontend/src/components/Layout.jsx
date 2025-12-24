import AnnouncementBanner from "./AnnouncementBanner";
import Navbar from "./Navbar";
import ModalContainer from "./ModalContainer";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      {/* <AnnouncementBanner /> */}

      <Navbar />

      <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        {/* {children} */}
        <Outlet />
      </main>

      <ModalContainer />
    </>
  );
}

export default Layout;
