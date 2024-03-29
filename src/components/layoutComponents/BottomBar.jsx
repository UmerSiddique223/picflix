import { Link,useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import getSvgs, { bottombarLinks } from "@/constants";
const BottomBar = () => {
  const {pathname}=useLocation();
  return (
   <section className="z-50 flex justify-around w-full sticky bottom-0 rounded-t-[20px] bg-[#09090A] px-5 py-4 md:hidden top-8">
{bottombarLinks.map((link) => {
            const isActive=pathname===link.route;
            console.log(isActive,pathname,link.route);
            return (
             
                <Link  key={link.label}
                className={`flex justify-center items-center flex-col ${isActive && 'bg-prim_Col rounded-[10px] gap-1 p-2 transition'}`}>
                 <div>
                  <img
                    src={getSvgs(link.name) }
                    alt={link.label}
                    className={`w-5 h-5 ${
                      isActive && "invert brightness-0"
                    }`}/></div>
                 <p className="text-[10px] text-[#EFEFEF] font-medium leading-[140%]">{link.label}</p> 
                </Link>
            
            );
          })}
      

   </section>

  )
}

export default BottomBar