import { useState, useEffect } from "react"; // Import useState and useEffect
import Navbar from "../navbar";
import Sidebar from "../sidebar/navbar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter(); // Define router using useRouter()
  const [pathname, setPathname] = useState(null);

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]); // Update useEffect dependency

  return (
    <div className="flex flex-col">
      {!pathname || (!pathname.includes("user") && <Navbar />)}{" "}
      {/* Add null check for pathname */}
      <div className="flex">
        {!pathname || (!pathname.includes("user") && <Sidebar />)}{" "}
        {/* Add null check for pathname */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
