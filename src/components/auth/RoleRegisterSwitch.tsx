import type { UserRole } from "@/types/user.type";

const RoleRegisterSwitch = ({
  role,
  changeRole
}: {
  role: UserRole,
  changeRole: React.Dispatch<React.SetStateAction<UserRole>>
}) => {
  return (
    <div className="mt-8 flex gap-2.5 items-center w-full">
      <div className={`${role === "user" ? 
      "bg-linear-to-t from-dark-primary to-primary border border-primary text-white" : 
      "bg-transparent border border-black/80 text-black/80 hover:bg-black/5"}
        py-2 w-1/2 rounded-lg text-center cursor-pointer`}
        onClick={() => changeRole("user")}  
      >
        <p className="font-medium text-lg">
          Trader
        </p>
      </div>
      <div className={`${role === "affiliator" ? 
      "bg-linear-to-t from-dark-primary to-primary border border-primary text-white" : 
      "bg-transparent border border-black/80 text-black/80 hover:bg-black/5"}
        py-2 w-1/2 rounded-lg text-center cursor-pointer`}
        onClick={() => changeRole("affiliator")}  
      >
        <p className="font-medium text-lg">
          Affiliator
        </p>
      </div>
    </div>
  )
}

export default RoleRegisterSwitch;
