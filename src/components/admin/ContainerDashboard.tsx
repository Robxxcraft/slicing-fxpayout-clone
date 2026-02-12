import type { UserProfile } from "@/models/user";
import AsideDashboard from "./AsideDashboard";
import NavbarDashboard from "./NavbarDashboard";
import { Outlet } from "react-router-dom";

const ContainerDashboard = ({ authUser }: { 
  authUser: UserProfile;
}) => {
  return (
    <>
      <NavbarDashboard authUser={authUser} />
      <div className="flex min-h-[calc(100vh)] max-h-[calc(100vh)] font-inter">
        <AsideDashboard />
        <div className="ml-20 md:ml-0 relative flex-1 flex flex-col mt-20 w-full overflow-x-auto">
          {<Outlet />}
        </div>
      </div>
    </>
  )
}

export default ContainerDashboard;
