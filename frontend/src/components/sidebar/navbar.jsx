import Navlinks from "./navlinks";

const Sidebar = () => {
  return (
    <div className="min-w-[20%] px-[2px] flex flex-col justify-between border-r-[1px] h-[100vh] py-[20px]">
      <div>
        <div className="flex flex-row gap-x-[15px] items-center px-[20px] pb-[10px] border-b-[1px]">
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
        </div>

        <div className="flex flex-col gap-y-[12px] text-[14px] mt-[30px]">
          <Navlinks link="accounts" logo="home.png" text="Accounts" />
          <Navlinks link="analytics" logo="analytics.png" text="Analytics" />
          <Navlinks link="composer" logo="compose.png" text="Composer" />
          <Navlinks link="recommend" logo="suggestion.png" text="Recommender" />
          <Navlinks link="twitter" logo="twitter.png" text="Twitter" />
          <Navlinks link="instagram" logo="instagram.png" text="Instagram" />
          <Navlinks link="youtube" logo="youtube.png" text="Youtube" />
        </div>
      </div>
      <div className="flex gap-x-[10px] items-center border-[1px] m-[10px] py-[10px] rounded-[10px] px-[20px]">
        <img className="h-[35px]" src="assets/images/profile.png" />
        <div>
          <p className="font-bold text-[14px]">Jhenil Parihar</p>
          <div className="flex px-[1px] items-center gap-x-[10px]">
            <p className="font-light text-[13px]">Logout</p>
            <img
              className="transform rotate-180 h-[15px]"
              src="assets/icons/logout.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
