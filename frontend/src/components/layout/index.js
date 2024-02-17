import Navbar from "../navbar";
import Sidebar from "../sidebar/navbar";

const Layout = ({ children }) => (
  <div className="flex flex-col">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  </div>
);

export default Layout;
