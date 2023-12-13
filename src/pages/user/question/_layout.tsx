import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sheet } from "@components/ui/sheet";
import Sidebar from "@components/ui/custom/Sidebar/Sidebar";
import Topbar from "@components/ui/custom/Topbar/Topbar";
import SidebarRight from "@components/user/questions/right-sidebar/Sidebar";
import SidebarLeft from "@components/user/questions/left-sidebar/Sidebar";
import { useEffect } from "react";
const QuestionLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is exactly '/community'
    if (location.pathname === "/forums") {
      navigate("/forums/list");
    }
  }, [navigate, location.pathname]);
  return (
    <div className="flex flex-col max-h-screen h-screen">
      <Sheet key={"sidebar"}>
        <Topbar />
        <Sidebar />
        <div className="grid grid-cols-12 grid-rows-1 h-full overflow-y-auto">
          <div className="col-span-2 lg:flex hidden my-6 pt-2 flex-col items-end pr-3 border-r border-border">
            <SidebarLeft />
          </div>

          <div className="lg:col-span-8 col-span-12 overflow-y-auto py-8 px-2 lg:mx-[5rem] mx-2 scroll-smooth">
            <Outlet />
          </div>

          <div className="col-span-2 lg:flex flex-col hidden border-l border-border pl-3 pt-8">
            <SidebarRight />
          </div>
        </div>
      </Sheet>
    </div>
  );
};
// scrollbar-thin scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full
export default QuestionLayout;
