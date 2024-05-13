import "../globals.css";
import Leftbar from "../../components/layout/Leftbar";
import BottomBar from "../../components/layout/BottomBar";
import Topbar from "../../components/layout/Topbar";
import { getUserCookie } from "@/lib/userCookie";

export const metadata = {
  title: "Picflix",
  description: "A fun social media platform for sharing photos and videos.",
};
export default function RootLayout({ children }) {
  const user = getUserCookie();
  return (
    <div className="lg:flex items-start">
      <Topbar user={user} />
      <Leftbar user={user} />
      {children}
      <BottomBar user={user} />
    </div>
  );
}
