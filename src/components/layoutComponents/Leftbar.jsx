import { Link, NavLink,useLocation } from "react-router-dom";
import profile from "../../assets/hq720.jpg";
// eslint-disable-next-line no-unused-vars
import getSvgs from "@/constants";
import { sidebarLinks } from "@/constants";
import logoutSvg from '../../assets/logout-svgrepo-com.svg'
import { Button } from "@/components/ui/button"
const Leftbar = () => {
  const {pathname}=useLocation();
  return (
    <nav className="hidden relative md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-bar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center text-gradient text-4xl">
          PicFLix
        </Link>
        <Link className="flex gap-3 items-center">
          <img src={profile} alt="" className="w-14 h-14 rounded-full" />
          <div className="flex flex-col">
            <p className="text-[18px] font-bold  leading-[140%]"> Butt Sahb</p>
            <p className="text-[#c0e5eb] text-[14px] font-normal leading-[140%]">
              @butt.sheracom{" "}
            </p>
          </div>
        </Link>
        <ul className=" flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive=pathname===link.route;
            console.log(isActive,pathname,link.route);
            return (
              <li
                key={link.label}
                className={`rounded-xl  group text-[16px] font-medium leading-[140%]  hover:bg-prim_Col  transition ${isActive && 'bg-prim_Col'}`}
              >
                <NavLink className="flex gap-4 items-center p-4  ">
                  <img
                    src={getSvgs(link.name) }
                    alt={link.label}
                    className={`group-hover:brightness-0 group-hover:invert ${
                      isActive && "invert brightness-0"
                    }`}                  />
                  {link.label}
                </NavLink>
              </li>
           
            );
          })}
        </ul>
      </div>
      
        <Button  variant="ghost" className="shad-button_ghost flex justify-start  gap-1">
    <img src={logoutSvg} className="w-6 h-6 "  alt="logout" />
    <p className="lg:text-[17px] text-[15px] font-medium leading-[140%]">Logout</p>
</Button>
    </nav>
  );
};

export default Leftbar;
