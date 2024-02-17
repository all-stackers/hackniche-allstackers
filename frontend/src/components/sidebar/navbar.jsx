import Navlinks from "./navlinks";

const Sidebar = () => {
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
          <Navlinks link="addMenu" logo="restaurant.png" text="Food Menu" />
          <Navlinks link="route-planning" logo="route.png" text="Route Planning" />
          <Navlinks link="analytics" logo="analysis.png" text="Analytics" />
          <Navlinks link="social-media" logo="instagram.png" text="Social Media" />
          {/* <Navlinks link="youtube" logo="youtube.png" text="Youtube" /> */}

          <div className="flex gap-x-[15px] items-center border-[1px] m-[10px] py-[10px] rounded-[10px] px-[20px] mt-auto mb-[40px]">
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
      </div>
      
    </div>
  );
};

export default Sidebar;
