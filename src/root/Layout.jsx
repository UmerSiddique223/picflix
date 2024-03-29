import BottomBar from "@/components/layoutComponents/BottomBar"
import Leftbar from "@/components/layoutComponents/Leftbar"
import Topbar from "@/components/layoutComponents/Topbar"
import { Outlet } from "react-router-dom"

const layout = () => {
  return (
    <div className="w-full md:flex ">
    <Topbar/>
    <Leftbar/>

<section className="flex flex-1 h-full">
    <Outlet/>
</section>
<BottomBar/>

    </div>
  )
}

export default layout