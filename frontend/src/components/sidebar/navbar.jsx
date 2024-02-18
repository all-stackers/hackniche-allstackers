import Navlinks from "./navlinks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {

  const notify = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:5000/notification", requestOptions)
      .then(response => response.text())
      .then(result => {
        toast.success("Notification sent successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {

      });
  }

  return (
    <div className="min-w-[20%] px-[2px] flex flex-col justify-between border-r-[1px] h-[100vh] py-[20px]">
      <div>
        {/* <div className="flex flex-row gap-x-[15px] items-center px-[20px] pb-[10px] border-b-[1px]">
          <img
            className="h-[35px]"
            src="/assets/images/social-media.png"
            alt="logo"
          />
          <div className="flex flex-col justify-start font-Lexend">
            <p className="text-xl font-bold">Social Space</p>
            <span className="text-[12px] font-light text-[#57534E]">
              Built for Data 2 Knowledge
            </span>
          </div>
        </div> */}

        <div className="flex flex-col gap-y-[10px] text-[14px] mt-[10px] h-[calc(100vh-80px)]">
          <Navlinks link="inventory" logo="goods.png" text="Inventory Management" />
          <Navlinks link="orders" logo="shopping-bag.png" text="Order Management" />
          <Navlinks link="analytics" logo="analysis.png" text="Analytics" />
          <Navlinks link="items" logo="restaurant.png" text="Food Menu" />
          <Navlinks link="route-planning" logo="route.png" text="Route Planning" />
          <Navlinks link="social-media" logo="instagram.png" text="Social Media" />
          <Navlinks link="legal-consultant" logo="law.png" text="Legal Consultant"/>
          {/* <Navlinks link="youtube" logo="youtube.png" text="Youtube" /> */}
          <div className="flex bg-[#4d72c4] text-white px-2 py-2 rounded-lg w-[60%] ml-[30px] cursor-pointer mt-auto">
              <img
                  className="mr-[5px]"
                  src="assets/images/chat.svg"
                />Send notification</div>   
          <div className="flex gap-x-[15px] items-center border-[1px] m-[10px] py-[10px] rounded-[10px] px-[20px] mb-[40px]">
            <img className="h-[35px]" src="assets/images/foodtruck.png" />
            <div>
              <p className="font-bold text-[14px]">B.Tech Fast Food</p>
              <div className="flex px-[1px] items-center gap-x-[14px]">
                <p className="font-light text-[13px]">Logout</p>
                <img
                  className="h-[15px]"
                  src="assets/images/logout.png"
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      
    </div>
  );
};

export default Sidebar;
