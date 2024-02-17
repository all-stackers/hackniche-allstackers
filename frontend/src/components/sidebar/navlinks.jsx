"use client";

import { usePathname, useRouter } from "next/navigation";

const Navlinks = ({ link, text, logo }) => {
  const Router = useRouter();
  const pathname = usePathname();

  const onClickHandler = () => {
    if (pathname == "/" + link) {
      return;
    } else if (link == "Logout") {
    } else {
      Router.push("/" + link);
    }
  };
  const isActive = (path) => {
    return pathname.includes(path);
  };

  return (
    <div
      className={`flex flex-row pl-[40px] py-[10px] gap-x-[20px] font-medium px-[16px] py-[8px] box-border items-center ${
        isActive(link) && "bg-red-200 fade-bg"
      }  rounded-r-full cursor-pointer`}
      onClick={onClickHandler}
    >
      <img className="h-[20px]" src={`/assets/images/${logo}`} alt="." />
      <div>{text}</div>
    </div>
  );
};

export default Navlinks;
