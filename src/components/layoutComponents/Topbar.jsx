import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import logoutSvg from '../../assets/logout-svgrepo-com.svg'
import profile from '../../assets/hq720.jpg'
const Topbar = () => {
  return (
    <section className="sticky top-0 z-50 md:hidden bg-bar w-full">
<div className="flex justify-between items-center py-4 px-5">
<Link to='/' className="flex gap-3 items-center text-gradient text-3xl">PicFLix</Link>
<div className="flex gap-4">

<Button variant="ghost" className="shad-button_ghost">
    <img src={logoutSvg} className="w-6 h-6"  alt="logout" />
</Button>
<Link className="flex justify-center items-center">
    <img src={profile} alt="profile picture" className="w-8 h-8 rounded-full" />
</Link>
</div>
</div>
    </section>
  )
}

export default Topbar