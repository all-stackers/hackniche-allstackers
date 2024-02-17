import Navbar from "../navbar";
import Sidebar from "../sidebar/navbar";

const Layout = ({ children }) => (
  <div className="flex flex-col">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  </div>
);

export default Layout;
