import { templateTier } from "@/constants/templateTier";
import type { UserGender, UserRole, UserTier } from "@/types/user.type";
import { TiInfoLarge } from "react-icons/ti";

type ProfileUserProps = {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  gender: UserGender;
  isLoading: boolean;
  status: "pending" | "approved";
  tier: UserTier;
  role: UserRole;
}

const ProfileUserDrawer = ({
  full_name,
  username,
  email,
  phone_number,
  gender,
  isLoading,
  status,
  tier,
  role
}: ProfileUserProps) => {
  const layoutProfile = [
    { 
      key: "full_name", 
      header: "Nama Lengkap", 
      value: full_name 
    },
    { 
      key: "username", 
      header: "Username",
      value: username 
    },
    { 
      key: "email", 
      header: "Email", 
      value: email 
    },
    { 
      key: "phone_number", 
      header: "Nomor Telepon",
      value: phone_number 
    },
    { 
      key: "gender", 
      header: "Jenis Kelamin",
      value: gender 
    },
    { 
      key: "tier", 
      header: "Tier",
      value: templateTier[role][tier].title
    },
  ];

  return (
    <div>
      {!isLoading && status === "pending" && 
        <div className="mb-4 px-4 py-2 2xl:py-3 flex items-center gap-2 bg-[#FEF3C6]">
          <span className="flex shrink-0 items-center justify-center size-5 2xl:size-7 border border-[#BE5409] rounded-full">
            <TiInfoLarge className="text-sm 2xl:text-lg text-[#BE5409]" />
          </span>
          <p className="text-sm 2xl:text-lg text-[#BE5409]">
            Pengguna belum menyelesaikan verifikasi email. 
          </p>
        </div>
      }
      <div className="space-y-3">
        {layoutProfile.map((layout) => {
          if (isLoading) {
            return (
              <div
                key={layout.key}
                className="mb-6 space-y-1.5 animate-pulse"
              >
                <div className="h-3 w-[30%] bg-gray-300 rounded-full"></div>
                <div className="h-3 w-full bg-gray-300 rounded-full"></div>
              </div>
            )
          }
          return (
            <div 
              key={layout.key} 
              className="flex flex-col gap-1 w-full"
            >
              <p className="w-full text-nowrap text-sm 2xl:text-lg text-black/60">
                {layout.header}
              </p>
              <p className="p-2.5 2xl:p-3 truncate w-full text-base 2xl:text-xl bg-[#F9F9F9] border border-[#D0D5DD] rounded-lg">
                {layout.key === "gender" ? 
                layout.value === "male" ? "Laki-laki" : "Perempuan"
                : layout.value
                }
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProfileUserDrawer;
